import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentState {
  showBanner: boolean;
  preferences: CookiePreferences;
  hasConsented: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  analytics: false,
  marketing: false,
  preferences: false,
};

// Google Analytics initialization
const initializeGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;
  
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    cookie_flags: 'max-age=7200;secure;samesite=strict'
  });

  console.log('Google Analytics inicializado');
};

// Facebook Pixel initialization
const initializeFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;
  
  // Facebook Pixel code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if(f.fbq) return;
    n = f.fbq = function(...args: any[]) {
      if(n.callMethod) {
        n.callMethod.apply(n, args);
      } else {
        n.queue.push(args);
      }
    };
    if(!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    }
  })(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');

  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }

  console.log('Facebook Pixel inicializado');
};

// Local storage keys
const CONSENT_KEY = 'webplan_cookie_consent';
const PREFERENCES_KEY = 'webplan_cookie_preferences';

export const useCookieConsent = () => {
  const [state, setState] = useState<CookieConsentState>({
    showBanner: false,
    preferences: defaultPreferences,
    hasConsented: false,
  });

  const initializeTools = useCallback((preferences: CookiePreferences) => {
    // Initialize Google Analytics if analytics is enabled
    if (preferences.analytics) {
      // TODO: Uncomment and replace with your actual Google Analytics ID
      // initializeGoogleAnalytics('G-XXXXXXXXX');
      console.log('Analytics aceito - Google Analytics seria inicializado aqui');
    }

    // Initialize Facebook Pixel if marketing is enabled
    if (preferences.marketing) {
      // TODO: Uncomment and replace with your actual Facebook Pixel ID
      // initializeFacebookPixel('YOUR-PIXEL-ID');
      console.log('Marketing aceito - Facebook Pixel seria inicializado aqui');
    }

    // Initialize other preference tools
    if (preferences.preferences) {
      console.log('Ferramentas de preferências inicializadas');
    }
  }, []);

  // Load saved preferences on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

    if (savedConsent === 'true' && savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setState({
        showBanner: false,
        preferences,
        hasConsented: true,
      });
      
      // Initialize tools based on saved preferences
      initializeTools(preferences);
    } else {
      // First visit - show banner
      setState(prev => ({
        ...prev,
        showBanner: true,
      }));
    }
  }, [initializeTools]);

  const savePreferences = useCallback((preferences: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    
    setState({
      showBanner: false,
      preferences,
      hasConsented: true,
    });

    initializeTools(preferences);
  }, [initializeTools]);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    savePreferences(allAccepted);
  }, [savePreferences]);

  const rejectAll = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    savePreferences(onlyNecessary);
  }, [savePreferences]);

  const updatePreferences = useCallback((newPreferences: CookiePreferences) => {
    // Ensure necessary cookies are always enabled
    const preferences = {
      ...newPreferences,
      necessary: true,
    };
    savePreferences(preferences);
  }, [savePreferences]);

  const showSettings = useCallback(() => {
    setState(prev => ({
      ...prev,
      showBanner: true,
    }));
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(PREFERENCES_KEY);
    setState({
      showBanner: true,
      preferences: defaultPreferences,
      hasConsented: false,
    });
  }, []);

  return {
    ...state,
    acceptAll,
    rejectAll,
    updatePreferences,
    showSettings,
    resetConsent,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// Export initialization functions for manual use when needed
export { initializeGoogleAnalytics, initializeFacebookPixel };