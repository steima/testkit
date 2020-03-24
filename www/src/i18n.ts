import {I18nResolver} from "i18n-ts";

const en = {
    en: 'English',
    de: 'German',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    share: 'Share',
    send: 'Send',
    search: 'Search',
    email: 'E-Mail',
    download: 'Download',
    menuLogin: 'Login',
    brandOfMatthiasSteinbauer: 'This is a service run by Matthias Steinbauer',
    imprint: 'Imprint'
};

const de = {
    en: 'Englisch',
    de: 'Deutsch',
    close: 'Schließen',
    save: 'Speichern',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    share: 'Teilen',
    send: 'Senden',
    search: 'Suchen',
    email: 'E-Mail',
    download: 'Herunterladen',
    menuLogin: 'Login',
    brandOfMatthiasSteinbauer: 'Dieses Service wird von Matthias Steinbauer betrieben',
    imprint: 'Impressum'
};
const i18n = {
    en: en,
    de: de,
    default: en
};

export const i18nResolver = new I18nResolver(i18n);
export const messages = i18nResolver.translation;
