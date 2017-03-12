
if (!customElements) {
  throw new Error('Ionic requires custom element support');
}

import { defineElements } from '../../../utils/helpers';


import {
  IonApp,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonElement,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNav,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '../../../components/index';


defineElements(window, {
  'ion-app': IonApp,
  'ion-badge': IonBadge,
  'ion-button': IonButton,
  'ion-card': IonCard,
  'ion-card-content': IonCardContent,
  'ion-card-header': IonCardHeader,
  'ion-card-title': IonCardTitle,
  'ion-content': IonContent,
  'ion-header': IonHeader,
  'ion-item': IonItem,
  'ion-label': IonLabel,
  'ion-list': IonList,
  'ion-list-header': IonListHeader,
  'ion-nav': IonNav,
  'ion-thumbnail': IonThumbnail,
  'ion-title': IonTitle,
  'ion-toolbar': IonToolbar
});
