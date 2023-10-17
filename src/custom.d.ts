declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content as string;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
interface ISponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: ISponsor;
}

interface ISponsor {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string | null;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: ISponsorLinks;
  profile_image: ISponsorProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISponsorSocial;
}

interface ISponsorLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface ISponsorProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface ISponsorSocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

interface ICard {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: string[];
  urls: IPhotoUrls;
  links: IPhotoLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: ISponsorship | null;
  topic_submissions: ITopicSubmissions[];
  user: IPhotoUser;
}

interface IPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface IPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface IPhotoUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string | null;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: IUserLinks;
  profile_image: IUserProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: IUserSocial;
}

interface IUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface IUserProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface IUserSocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

interface IDeviceWidthObject {
  [key: string]: { max: number; min: number };
}

interface IIdDeviceBreakpointsByWidth {
  laptop_max: number;
  laptop_min: number;
  tablet_min: number;
  tablet_max: number;
  mobile_max: number;
  default_min: number;
}

interface IIdMobileHeight {
  mobileLandscape_min: number;
  mobileLandscape_max: number;
}

interface IBuildDeviceDetails {
  deviceType: string;
  deviceTypeVariant: string;
  orientation: 'Portrait' | 'Landscape';
  width: number;
  height: number;
  isFallback: boolean;
}

interface IWindowDimension {
  width: number;
  height: number;
}

interface IHandleExceptionsProps {
  buildDeviceDetails: IBuildDeviceDetails;
  width: number;
  height: number;
}
