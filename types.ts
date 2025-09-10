export interface Policy {
  id: number;
  title: string;
  description: string;
  url: string; // URL to a mock PDF viewer
  version: string;
}

export interface BasicInfo {
  fullName?: string;
  employeeId?: string;
  department?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
}

export interface IdCardInfo {
  photoPreview?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface PfInfo {
  uan?: string;
  nomineeName?: string;
  nomineeRelationship?: string;
  nomineeDob?: string;
  // New fields for UAN creation request
  hasUan?: 'yes' | 'no';
  phoneForPf?: string;
  emailForPf?: string;
  aadhaar?: string;
  bankAccount?: string;
  ifscCode?: string;
}

export interface EmployeeData {
  basicInfo: BasicInfo;
  idCardInfo: IdCardInfo;
  pfInfo: PfInfo;
}

export interface TeamMember {
    id: string;
    name: string;
    employeeId?: string;
    role: string;
    department: string;
    email: string;
    imageUrl: string;
}

export enum ToolActionType {
  DIRECT_DOWNLOAD = 'DIRECT_DOWNLOAD',
  REQUEST_IT = 'REQUEST_IT',
  REQUEST_LICENSE = 'REQUEST_LICENSE',
}

export interface Tool {
  id: string;
  name: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  category: string;
  version: string;
  lastUpdated: string;
  actionType: ToolActionType;
  downloadUrl?: string;
}