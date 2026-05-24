import { db } from "@workspace/db";
import { adminUsersTable, blogPostsTable, siteSettingsTable } from "@workspace/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await db
    .insert(adminUsersTable)
    .values({ username: "admin", passwordHash })
    .onConflictDoNothing();
  console.log("Admin user created: admin / admin123");

  // Seed site settings
  await db
    .insert(siteSettingsTable)
    .values({
      phone: "+2348072072332",
      email: "yolatoye@equipchainglobal.com",
      address: "Biviomat Nigeria Ltd Office 2nd floor, Aziom Plaza Opp. Old Nitel Exchange, Tabon-Tabon, Agege, Lagos State, Nigeria, West-Africa.",
      businessHours: "Monday – Friday: 8:00 AM – 5:00 PM (WAT)\nSaturday: 9:00 AM – 1:00 PM (WAT)",
    })
    .onConflictDoNothing();

  // Seed blog posts
  const posts = [
    {
      title: "Navigating Oil & Gas Procurement in Nigeria: Key Strategies for 2024",
      slug: "navigating-oil-gas-procurement-nigeria-2024",
      category: "Procurement",
      tags: "oil and gas, procurement, Nigeria, supply chain",
      featuredImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
      excerpt: "As Nigeria's oil and gas sector continues to evolve, procurement professionals face new challenges and opportunities. Here are the key strategies that are shaping successful procurement operations in 2024.",
      content: `<h2>Introduction</h2><p>Nigeria's oil and gas sector remains one of the most dynamic and demanding procurement environments in Africa. With global energy transitions, fluctuating oil prices, and increasing local content requirements, procurement professionals must adapt their strategies to remain competitive and compliant.</p><h2>1. Embracing Local Content Requirements</h2><p>The Nigerian Oil and Gas Industry Content Development Act (NOGICD Act) continues to drive local content development across the supply chain. Successful procurement teams are building robust local supplier databases, investing in vendor development programs, and establishing long-term partnerships with indigenous companies like EquipChain Global Ltd.</p><h2>2. Digital Transformation in Procurement</h2><p>Leading operators are leveraging digital platforms for vendor management, purchase order tracking, and supply chain visibility. Real-time dashboards allow procurement managers to monitor delivery timelines, flag potential delays, and optimize inventory levels across multiple project sites.</p><h2>3. Building Resilient Supply Chains</h2><p>Post-pandemic supply chain disruptions have made resilience a top priority. Smart procurement teams are diversifying their supplier base, maintaining strategic buffer stocks for critical materials, and developing contingency sourcing plans for high-risk categories.</p><h2>Conclusion</h2><p>Success in Nigeria's oil and gas procurement landscape requires a combination of local market expertise, strong supplier relationships, and adaptive strategies. EquipChain Global Ltd is positioned to help clients navigate these complexities with confidence.</p>`,
      seoTitle: "Oil & Gas Procurement Nigeria 2024 | Key Strategies | EquipChain",
      seoDescription: "Discover key strategies for navigating oil and gas procurement in Nigeria in 2024. Expert insights from EquipChain Global Ltd on supply chain, local content, and vendor management.",
      status: "published" as const,
      author: "EquipChain Editorial Team",
      publishedAt: new Date("2024-03-15"),
    },
    {
      title: "Supply Chain Optimization for Industrial Operations: A Practical Guide",
      slug: "supply-chain-optimization-industrial-operations-guide",
      category: "Supply Chain",
      tags: "supply chain, logistics, industrial, optimization",
      featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      excerpt: "Efficient supply chain management is the backbone of successful industrial operations. This practical guide covers proven strategies for reducing costs, improving delivery performance, and building supplier resilience.",
      content: `<h2>Why Supply Chain Optimization Matters</h2><p>In industrial operations, supply chain inefficiencies can translate directly into project delays, cost overruns, and operational downtime. A well-optimized supply chain ensures that the right materials, equipment, and consumables arrive at the right place, at the right time, and at the right cost.</p><h2>Key Areas for Optimization</h2><h3>Vendor Consolidation</h3><p>Working with fewer, more reliable vendors reduces administrative overhead and strengthens supplier relationships. Focus on vendors with proven track records, appropriate certifications, and the capacity to meet your volume requirements consistently.</p><h3>Inventory Management</h3><p>Implement demand forecasting tools to maintain optimal inventory levels. Too much inventory ties up capital; too little creates operational risk. The sweet spot lies in data-driven safety stock calculations aligned with your operational criticality assessments.</p><h3>Logistics Coordination</h3><p>Streamline last-mile logistics by working with experienced local logistics providers who understand the operational environment. In Nigeria's challenging terrain, local knowledge is invaluable for reliable material delivery to site.</p><h2>Measuring Success</h2><p>Track key performance indicators including on-time delivery rate, purchase order cycle time, supplier quality rejection rate, and total cost of ownership. Regular supplier performance reviews create accountability and drive continuous improvement.</p>`,
      seoTitle: "Supply Chain Optimization for Industrial Operations | EquipChain Global",
      seoDescription: "Practical guide to supply chain optimization for industrial operations in Nigeria. Expert advice on vendor management, inventory optimization, and logistics coordination.",
      status: "published" as const,
      author: "EquipChain Editorial Team",
      publishedAt: new Date("2024-04-20"),
    },
    {
      title: "HSE Compliance in Industrial Procurement: What Every Buyer Needs to Know",
      slug: "hse-compliance-industrial-procurement-guide",
      category: "HSE",
      tags: "HSE, health safety environment, procurement, compliance, Nigeria",
      featuredImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      excerpt: "Health, Safety, and Environment (HSE) compliance is no longer optional in industrial procurement. Understanding HSE requirements and how they apply to your supply chain is critical for operational safety and regulatory compliance.",
      content: `<h2>HSE in the Procurement Context</h2><p>Procurement decisions have a direct impact on workplace safety. The materials, equipment, and services you procure must meet applicable HSE standards to protect workers, communities, and the environment. A robust HSE procurement framework is both a legal requirement and a moral obligation.</p><h2>Key HSE Considerations in Procurement</h2><h3>Supplier HSE Prequalification</h3><p>Before engaging any supplier, conduct thorough HSE prequalification. This includes reviewing HSE policies, incident history, certifications, and management systems. Suppliers who cannot demonstrate a genuine commitment to safety should be excluded from the approved vendor list.</p><h3>Material Safety Data Sheets (MSDS)</h3><p>Ensure that MSDS documentation accompanies all chemical and hazardous material deliveries. Proper storage, handling, and disposal procedures must be communicated to all relevant personnel.</p><h3>Equipment Certification</h3><p>All pressure vessels, lifting equipment, electrical equipment, and other regulated categories must come with valid certification and inspection records. Non-compliant equipment creates significant safety and legal liability.</p><h2>EquipChain's HSE Commitment</h2><p>At EquipChain Global Ltd, HSE is embedded in our procurement process. We only engage with suppliers who meet our HSE standards, and we continuously monitor supplier performance to ensure ongoing compliance.</p>`,
      seoTitle: "HSE Compliance in Industrial Procurement Nigeria | EquipChain Global",
      seoDescription: "Learn about HSE compliance requirements for industrial procurement in Nigeria. Expert guidance on supplier prequalification, material safety, and equipment certification.",
      status: "published" as const,
      author: "EquipChain Editorial Team",
      publishedAt: new Date("2024-05-10"),
    },
    {
      title: "Why Indigenous Procurement Companies Are Driving Nigeria's Industrial Growth",
      slug: "indigenous-procurement-companies-nigeria-industrial-growth",
      category: "Industry Insights",
      tags: "indigenous, local content, procurement, Nigeria, industrial growth",
      featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      excerpt: "Nigeria's commitment to developing indigenous capacity in the oil, gas, and industrial sectors has opened significant opportunities for local procurement companies. Here is how indigenous firms are making a difference.",
      content: `<h2>The Rise of Indigenous Procurement Companies</h2><p>The Nigerian government's local content policy has catalyzed the growth of indigenous procurement and supply chain companies capable of competing with international players. These companies bring unique advantages: deep local market knowledge, established community relationships, and agile operational structures that respond quickly to client needs.</p><h2>Unique Advantages of Working with Indigenous Companies</h2><h3>Local Market Intelligence</h3><p>Indigenous companies understand Nigeria's complex logistics landscape, regulatory environment, and business culture. This knowledge translates into faster procurement cycles, fewer compliance surprises, and stronger vendor relationships built on mutual trust.</p><h3>Cost Efficiency</h3><p>Eliminating the overhead associated with expatriate-staffed procurement operations can yield significant cost savings. Indigenous companies operate leaner structures without sacrificing quality or compliance.</p><h3>Community and Stakeholder Relations</h3><p>In host community environments, working with indigenous companies demonstrates commitment to local economic development and can significantly reduce community-related operational risks.</p><h2>The EquipChain Difference</h2><p>EquipChain Global Ltd combines the agility and local intelligence of an indigenous company with management experience developed through exposure to world-class operators including Chevron, ExxonMobil, and Dangote Group. This combination delivers world-class service with genuine local expertise.</p>`,
      seoTitle: "Indigenous Procurement Companies Driving Nigeria's Industrial Growth | EquipChain",
      seoDescription: "Discover how indigenous procurement companies are driving Nigeria's industrial growth. EquipChain Global Ltd's role in local content development and supply chain excellence.",
      status: "published" as const,
      author: "EquipChain Editorial Team",
      publishedAt: new Date("2024-06-05"),
    },
  ];

  for (const post of posts) {
    await db
      .insert(blogPostsTable)
      .values(post)
      .onConflictDoNothing();
  }
  console.log("Blog posts seeded:", posts.length);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
