import * as d from '@declarations';
import { BUILD } from '@build-conditionals';
import { consoleError, getHostRef, writeTask } from '@platform';
import { parsePropertyValue } from './parse-property-value';
import { update } from './update';


export const setValue = (ref: d.RuntimeRef, propName: string, newVal: any, cmpMeta: d.ComponentRuntimeMeta) => {
  // check our new property value against our internal value
  const hostRef = getHostRef(ref);
  const elm = BUILD.lazyLoad ? hostRef.hostElement : ref as d.HostElement;
  const oldVal = hostRef.instanceValues.get(propName);
  newVal = parsePropertyValue(newVal, cmpMeta.cmpMembers[propName][0]);

  if (newVal !== oldVal) {
    // gadzooks! the property's value has changed!!

    if (!hostRef.isConstructingInstance || (hostRef.isConstructingInstance && oldVal === undefined)) {
      // set our new value!
      hostRef.instanceValues.set(propName, newVal);

      if (!BUILD.lazyLoad || hostRef.lazyInstance) {
        // get an array of method names of watch functions to call
        if (BUILD.watchCallback && cmpMeta.watchers && hostRef.hasRendered) {
          const watchMethods = cmpMeta.watchers[propName];

          if (watchMethods) {
            // this instance is watching for when this property changed
            watchMethods.forEach(watchMethodName => {
              try {
                // fire off each of the watch methods that are watching this property
                (BUILD.lazyLoad ? hostRef.lazyInstance : elm as any)[watchMethodName].call(
                  (BUILD.lazyLoad ? hostRef.lazyInstance : elm as any),
                  newVal,
                  oldVal,
                  propName
                );

              } catch (e) {
                consoleError(e);
              }
            });
          }
        }

        if (BUILD.updatable && !hostRef.isActiveRender && hostRef.hasRendered && !hostRef.isQueuedForUpdate) {
          // looks like this value actually changed, so we've got work to do!
          // but only if we've already rendered, otherwise just chill out
          // queue that we need to do an update, but don't worry about queuing
          // up millions cuz this function ensures it only runs once
          hostRef.isQueuedForUpdate = true;

          writeTask(() =>
            update(
              elm,
              (BUILD.lazyLoad ? hostRef.lazyInstance : elm),
              hostRef,
              cmpMeta
            )
          );

        }
      }
    }
  }
};