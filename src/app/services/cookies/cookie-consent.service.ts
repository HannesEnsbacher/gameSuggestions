import {Injectable} from '@angular/core';
import * as CookieConsent from "vanilla-cookieconsent";


declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private cookieConsent: any;

  private readonly CAT_NECESSARY = "necessary";
  private readonly CAT_ANALYTICS = "analytics";
  private readonly CAT_ADVERTISEMENT = "advertisement";
  private readonly CAT_FUNCTIONALITY = "functionality";
  private readonly CAT_SECURITY = "security";

  private readonly SERVICE_AD_STORAGE = 'ad_storage'
  private readonly SERVICE_AD_USER_DATA = 'ad_user_data'
  private readonly SERVICE_AD_PERSONALIZATION = 'ad_personalization'
  private readonly SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
  private readonly SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
  private readonly SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
  private readonly SERVICE_SECURITY_STORAGE = 'security_storage'

  constructor() {
    this.initGTM();
  }

  /**
   * Initialize Google Tag Manager and set default consent mode to 'denied'
   */
  private initGTM(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Set default consent to 'denied' (this should happen before changing any other dataLayer)
    window.gtag('consent', 'default', {
      [this.SERVICE_AD_STORAGE]: 'denied',
      [this.SERVICE_AD_USER_DATA]: 'denied',
      [this.SERVICE_AD_PERSONALIZATION]: 'denied',
      [this.SERVICE_ANALYTICS_STORAGE]: 'denied',
      [this.SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
      [this.SERVICE_PERSONALIZATION_STORAGE]: 'denied',
      [this.SERVICE_SECURITY_STORAGE]: 'denied',
    });
  }

  initCookieConsent(): void {
    this.cookieConsent = CookieConsent.run({


      // Trigger consent update when user choices change
      onFirstConsent: () => {
        this.updateGtagConsent();
      },
      onConsent: () => {
        this.updateGtagConsent();
      },
      onChange: () => {
        this.updateGtagConsent();
      },

      cookie: {
        expiresAfterDays: 14,
      },

      categories: {
        [this.CAT_NECESSARY]: {
          enabled: true,  // this category is enabled by default
          readOnly: true  // this category cannot be disabled
        },
        [this.CAT_ANALYTICS]: {
          autoClear: {
            cookies: [
              {
                name: /^_ga/,   // regex: match all cookies starting with '_ga'
              },
              {
                name: '_gid',   // string: exact cookie name
              }
            ]
          },
          services: {
            [this.SERVICE_ANALYTICS_STORAGE]: {
              label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
            }
          }
        },
/*        [this.CAT_ADVERTISEMENT]: {
          services: {
            [this.SERVICE_AD_STORAGE]: {
              label: 'Enables storage (such as cookies) related to advertising.',
            },
            [this.SERVICE_AD_USER_DATA]: {
              label: 'Sets consent for sending user data related to advertising to Google.',
            },
            [this.SERVICE_AD_PERSONALIZATION]: {
              label: 'Sets consent for personalized advertising.',
            },
          }
        },
        [this.CAT_FUNCTIONALITY]: {
          services: {
            [this.SERVICE_FUNCTIONALITY_STORAGE]: {
              label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
            },
            [this.SERVICE_PERSONALIZATION_STORAGE]: {
              label: 'Enables storage related to personalization e.g. video recommendations.',
            },
          }
        },
        [this.CAT_SECURITY]: {
          services: {
            [this.SERVICE_SECURITY_STORAGE]: {
              label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
            },
          }
        }*/
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              // description: 'Cookie modal description',
              description: 'For more information in relation to the policy on cookies and your choices, please refer to the <a href="/privacy">privacy policy</a>',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage Individual preferences'
            },
            preferencesModal: {
              title: 'Manage cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Accept current selection',
              closeIconLabel: 'Close modal',
              sections: [
                {
                  title: 'Somebody said ... cookies?',
                  description: 'I want one!'
                },
                {
                  title: 'Strictly Necessary cookies',
                  description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                  linkedCategory: this.CAT_NECESSARY
                },
                {
                  title: 'Performance and Analytics',
                  description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                  linkedCategory: this.CAT_ANALYTICS
                },
                /*{
                  title: 'Advertising',
                  description: 'Google uses cookies for advertising, including serving and rendering ads, personalizing ads (depending on your ad settings at <a href=\"https://g.co/adsettings\">g.co/adsettings</a>), limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.',
                  linkedCategory: this.CAT_ADVERTISEMENT,
                },
                {
                  title: 'Functionality',
                  description: 'Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user’s choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user’s session, such as the content of a shopping cart.',
                  linkedCategory: this.CAT_FUNCTIONALITY,
                },
                {
                  title: 'Security',
                  description: 'Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.',
                  linkedCategory: this.CAT_SECURITY,
                },*/
                {
                  title: 'More information',
                  description: 'For more information in relation to the policy on cookies and your choices, please refer to the <a routerLink="/privacy">privacy policy</a>'
                }
              ]
            }
          }
        }
      }
    });
  }

  /**
   * Update GTM Consent based on user preferences in the CookieConsent UI
   */
  private updateGtagConsent(): void {
    const consentMode = {
      [this.SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(this.SERVICE_ANALYTICS_STORAGE, this.CAT_ANALYTICS) ? 'granted' : 'denied',
      [this.SERVICE_AD_STORAGE]: CookieConsent.acceptedService(this.SERVICE_AD_STORAGE, this.CAT_ADVERTISEMENT) ? 'granted' : 'denied',
      [this.SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(this.SERVICE_AD_USER_DATA, this.CAT_ADVERTISEMENT) ? 'granted' : 'denied',
      [this.SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(this.SERVICE_AD_PERSONALIZATION, this.CAT_ADVERTISEMENT) ? 'granted' : 'denied',
      [this.SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(this.SERVICE_FUNCTIONALITY_STORAGE, this.CAT_FUNCTIONALITY) ? 'granted' : 'denied',
      [this.SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(this.SERVICE_PERSONALIZATION_STORAGE, this.CAT_FUNCTIONALITY) ? 'granted' : 'denied',
      [this.SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(this.SERVICE_SECURITY_STORAGE, this.CAT_SECURITY) ? 'granted' : 'denied',
    };
    window.gtag('consent', 'update', consentMode);
    localStorage.setItem('constenMode', JSON.stringify(consentMode));
  }
}
