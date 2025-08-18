export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    label: string;
    href: string;
  }>;
}

export interface Partner {
  name: string;
  logo?: string;
  hasPage?: boolean;
  href?: string;
}