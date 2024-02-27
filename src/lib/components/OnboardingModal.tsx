import React from "react";
import styles from "../../app/ui/modal.module.css";

type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void; // Define onClose as a function that doesn't return anything
  children: React.ReactNode; // React.ReactNode covers anything that is renderable
};

export default function OnboardingModal({
  isOpen,
  onClose,
  children,
}: OnboardingModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
