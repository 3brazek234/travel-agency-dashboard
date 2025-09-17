// Interface للـ Activity داخل اليوم
export interface TripActivity {
  time: string;
  description: string;
}

// Interface لليوم في الجدول
export interface TripDay {
  day: number;
  location: string;
  activities: TripActivity[];
}

// Interface للمكان
export interface TripLocation {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

// Interface للتفاصيل
export interface TripDetail {
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  country: string;
  interests: string;
  groupType: string;
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: TripLocation;
  itinerary: TripDay[];
}

// Interface للـ Document بتاع Appwrite
export interface TripDocument {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $sequence?: number;   
  userId: string;
  createdAt: string;
  imgUrl: string[];
  payment_link: string;
  tripdetail: string; // JSON string من Gemini (لازم تعمله parse قبل الاستخدام)
}
// أي Document راجع من Appwrite
export interface AppwriteDocument {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

// النتيجة اللي بترجع من listDocuments
export interface AppwriteListResponse<T = AppwriteDocument> {
  total: number;
  documents: T[];
}
