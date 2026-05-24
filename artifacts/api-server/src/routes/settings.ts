import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// Public: get site settings
router.get("/settings", async (_req, res) => {
  try {
    const [settings] = await db.select().from(siteSettingsTable).limit(1);
    if (!settings) {
      res.json({
        id: 0,
        phone: "+2348072072332",
        email: "yolatoye@equipchainglobal.com",
        address: "Biviomat Nigeria Ltd Office 2nd floor, Aziom Plaza Opp. Old Nitel Exchange, Tabon-Tabon, Agege, Lagos State, Nigeria, West-Africa.",
        businessHours: "Monday – Friday: 8:00 AM – 5:00 PM (WAT)",
        facebookUrl: null,
        twitterUrl: null,
        linkedinUrl: null,
        instagramUrl: null,
      });
      return;
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update site settings
router.put("/settings", requireAuth, async (req, res) => {
  try {
    const { phone, email, address, businessHours, facebookUrl, twitterUrl, linkedinUrl, instagramUrl } = req.body;

    const [existing] = await db.select().from(siteSettingsTable).limit(1);

    if (existing) {
      const [updated] = await db
        .update(siteSettingsTable)
        .set({
          phone: phone !== undefined ? phone : existing.phone,
          email: email !== undefined ? email : existing.email,
          address: address !== undefined ? address : existing.address,
          businessHours: businessHours !== undefined ? businessHours : existing.businessHours,
          facebookUrl: facebookUrl !== undefined ? facebookUrl : existing.facebookUrl,
          twitterUrl: twitterUrl !== undefined ? twitterUrl : existing.twitterUrl,
          linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : existing.linkedinUrl,
          instagramUrl: instagramUrl !== undefined ? instagramUrl : existing.instagramUrl,
          updatedAt: new Date(),
        })
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(siteSettingsTable)
        .values({ phone, email, address, businessHours, facebookUrl, twitterUrl, linkedinUrl, instagramUrl })
        .returning();
      res.json(created);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
