import React from "react";

export function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl prose dark:prose-invert">
      <h1 className="font-display font-bold text-[#0b0d82]">Terms & Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
      </p>

      <h2>2. Use License</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials on EquipChain Global Ltd's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
      </p>

      <h2>3. Disclaimer</h2>
      <p>
        All the materials on EquipChain Global Ltd's website are provided "as is". EquipChain Global Ltd makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, EquipChain Global Ltd does not make any representations concerning the accuracy or reliability of the use of the materials on its website or otherwise relating to such materials or any sites linked to this website.
      </p>

      <h2>4. Limitations</h2>
      <p>
        EquipChain Global Ltd or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on EquipChain Global Ltd's website, even if EquipChain Global Ltd or an authorize representative of this website has been notified, orally or written, of the possibility of such damage.
      </p>

      <h2>5. Revisions and Errata</h2>
      <p>
        The materials appearing on EquipChain Global Ltd's website may include technical, typographical, or photographic errors. EquipChain Global Ltd will not promise that any of the materials in this website are accurate, complete, or current. EquipChain Global Ltd may change the materials contained on its website at any time without notice.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        Any claim related to EquipChain Global Ltd's website shall be governed by the laws of Nigeria without regards to its conflict of law provisions.
      </p>
    </div>
  );
}
