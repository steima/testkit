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
    menuLogin: 'Anmelden',
    menuLogout: 'Abmelden',
    brandOfMatthiasSteinbauer: 'This is a service run by Matthias Steinbauer',
    imprint: 'Imprint',
    dialogUpdateConditionTitle: 'Update your status',
    dialogUpdateConditionHint: 'Your health status will only be visible to you. We do not share this information with anyone and specifically do not send this information back to Facebook. Your status will be used to report to your peers if they came into contact with an infected person.',
    dialogUpdateConditionCondition: 'CORVID-19 condition',
    dialogUpdateConditionSwabTakenAt: 'Swab taken at',
    dialogUpdateConditionTestResultsAt: 'Test results in at',
    dialogUpdateConditionLabName: 'Lab name (optional)'
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
    menuLogout: 'Logout',
    brandOfMatthiasSteinbauer: 'Dieses Service wird von Matthias Steinbauer betrieben',
    imprint: 'Impressum',
    dialogUpdateConditionTitle: 'Aktualisiere deinen Status',
    dialogUpdateConditionHint: 'Dein Gesundheitsstatus ist nur für dich sichtbar. Wir geben diese Information auch nicht an Dritte weiter, insbesondere wird diese Information nicht bei Facebook gespeichert. Dein Status wird lediglich verwendet um für deine Freunde einen Alarm auszulösen, falls diese mit einer infizierten Person in Kontakt gekommen sind.',
    dialogUpdateConditionCondition: 'CORVID-19 Zustand',
    dialogUpdateConditionSwabTakenAt: 'Abstrich vom',
    dialogUpdateConditionTestResultsAt: 'Testergebnis vom',
    dialogUpdateConditionLabName: 'Labor (optional)'
};
const i18n = {
    en: en,
    de: de,
    default: en
};

export const i18nResolver = new I18nResolver(i18n);
export const messages = i18nResolver.translation;
