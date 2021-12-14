enum TriageCtaType {
  BookConsultation = 'book-consultation',
  CloseScreen = 'close-screen',
  FindNearby = 'find-nearby',
  OpenUrl = 'open-url',
  Phone = 'phone',
}

enum TriageCtaFindNearbyLocation {
  EmergencyRoom = 'emergency-room',
  Hospital = 'hospital',
  Pharmacy = 'pharmacy',
  UrgentCare = 'urgent-care',
}

type TriageCtaBookConsultation = {
  type: TriageCtaType.BookConsultation;
};

type TriageCloseScreen = {
  type: TriageCtaType.CloseScreen;
};

type TriageCtaFindNearby = {
  data: {
    location: TriageCtaFindNearbyLocation;
  };
  type: TriageCtaType.FindNearby;
};

type TriageCtaOpenUrl = {
  data: {
    url: string;
  };
  type: TriageCtaType.OpenUrl;
};

type TriageCtaPhone = {
  data: {
    number: string;
  };
  type: TriageCtaType.Phone;
};

type TriageCta =
  | TriageCtaBookConsultation
  | TriageCloseScreen
  | TriageCtaFindNearby
  | TriageCtaOpenUrl
  | TriageCtaPhone;

export { TriageCta, TriageCtaType };
