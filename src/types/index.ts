export type ResourceCategory =
  | 'Healthcare'
  | 'Hospitals'
  | 'Pharmacies'
  | 'Medicines'
  | 'Blood Banks'
  | 'Oxygen'
  | 'Food Support'
  | 'Shelters'
  | 'Ambulances'
  | 'Vaccination'
  | 'Testing Centers'
  | 'Essential Services'
  | 'Volunteers'
  | 'Other';

export type AvailabilityStatus = 'AVAILABLE' | 'LIMITED' | 'FULL' | 'CLOSED';

export interface LocationGeo {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface ResourceAvailability {
  beds?: number;
  icuBeds?: number;
  oxygenCylinders?: number;
  bloodGroupsAvailable?: string[];
  foodPackets?: number;
  status: AvailabilityStatus;
  notes?: string;
  lastUpdated?: string;
}

export interface Resource {
  _id: string;
  id?: string;
  name: string;
  category: ResourceCategory;
  description: string;
  contact: {
    phone: string;
    altPhone?: string;
    email?: string;
    website?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
  };
  location: LocationGeo;
  availability: ResourceAvailability;
  operatingHours: string;
  verified: boolean;
  rating?: number;
  reviewsCount?: number;
  distanceKm?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type EmergencyType = 'Medical' | 'Ambulance' | 'Oxygen' | 'Shelter' | 'Fire' | 'Blood' | 'Other';
export type EmergencyStatus = 'CREATED' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';

export interface EmergencyRequest {
  _id: string;
  requestId: string;
  userId?: string;
  userName: string;
  userPhone: string;
  location: LocationGeo;
  addressString?: string;
  type: EmergencyType;
  description: string;
  nearestHospital?: {
    name: string;
    distance: string;
    phone: string;
  };
  nearestAmbulance?: {
    name: string;
    distance: string;
    phone: string;
  };
  status: EmergencyStatus;
  createdAt: string;
  resolvedAt?: string;
}

export type ComplaintStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Complaint {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  resourceId?: string;
  resourceName?: string;
  subject: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  adminResponse?: string;
  createdAt: string;
  updatedAt?: string;
}

export type UserRole = 'USER' | 'ADMIN' | 'RESOURCE_PROVIDER' | 'VOLUNTEER';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  savedResources?: string[];
  createdAt: string;
}

export interface Volunteer {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: 'IMMEDIATE' | 'WEEKENDS' | 'PART_TIME' | 'ON_CALL';
  preferredRole: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  createdAt: string;
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  highTemp: number;
  lowTemp: number;
  alert?: {
    title: string;
    severity: 'INFO' | 'WARNING' | 'EMERGENCY';
    description: string;
  };
}

export interface NotificationItem {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'RESOURCE_UPDATE' | 'COMPLAINT_UPDATE' | 'EMERGENCY' | 'WEATHER' | 'SYSTEM';
  read: boolean;
  createdAt: string;
}

export interface PlatformStats {
  verifiedResources: number;
  availableServices: number;
  activeVolunteers: number;
  emergencySupportCoverage: string;
  hospitalsCount: number;
  pharmaciesCount: number;
  oxygenSuppliersCount: number;
  bloodBanksCount: number;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  toolsInvoked?: string[];
  resourceSuggestions?: Resource[];
}
