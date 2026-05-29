import trackedExcavatorImg from "@assets/generated_images/prod_tracked_excavator_1780085691301.png";
import backhoeLoaderImg from "@assets/generated_images/prod_backhoe_loader_1780085712600.png";
import wheelLoaderImg from "@assets/generated_images/prod_wheel_loader_1780085734962.png";
import telehandlerImg from "@assets/generated_images/prod_telehandler_1780085754494.png";
import skidSteerImg from "@assets/generated_images/prod_skid_steer_1780085776493.png";
import breakerImg from "@assets/generated_images/prod_hydraulic_breaker_1780085795230.png";
import bucketImg from "@assets/generated_images/prod_digging_bucket_1780085811555.png";
import sweeperImg from "@assets/generated_images/prod_sweeper_1780085828793.png";

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const productsData: Product[] = [
  {
    id: "tracked-excavator",
    name: "Heavy-Duty Tracked Excavator",
    image: trackedExcavatorImg,
    description: "A robust tracked excavator built to handle the toughest digging and earthmoving tasks with maximum efficiency and operator comfort."
  },
  {
    id: "backhoe-loader",
    name: "Versatile Backhoe Loader",
    image: backhoeLoaderImg,
    description: "An essential machine combining loader and backhoe capabilities, offering versatile performance for construction, trenching, and material handling."
  },
  {
    id: "wheel-loader",
    name: "Compact Wheel Loader",
    image: wheelLoaderImg,
    description: "Highly maneuverable wheel loader designed for fast material movement in tight spaces, without compromising on power or lift capacity."
  },
  {
    id: "telehandler",
    name: "Telescopic Handler",
    image: telehandlerImg,
    description: "Reach higher and lift heavier with this versatile telehandler. Perfect for agricultural, construction, and industrial material placement."
  },
  {
    id: "skid-steer",
    name: "Skid Steer Loader",
    image: skidSteerImg,
    description: "Agile, powerful, and easy to operate skid steer loader built to navigate narrow work sites while delivering high breakout force."
  },
  {
    id: "hydraulic-breaker",
    name: "Hydraulic Breaker Attachment",
    image: breakerImg,
    description: "A heavy-duty hydraulic breaker attachment designed to power through rock, concrete, and tough demolition projects with ease."
  },
  {
    id: "digging-bucket",
    name: "Heavy-Duty Digging Bucket",
    image: bucketImg,
    description: "A durable steel digging bucket with reinforced teeth, engineered for maximum penetration and capacity in hard soil and rock."
  },
  {
    id: "sweeper",
    name: "Industrial Sweeper Attachment",
    image: sweeperImg,
    description: "Keep the worksite clean and safe with a high-capacity sweeper attachment, perfect for roads, industrial yards, and large facilities."
  }
];
