import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useWizard } from "../../hooks";
import { CreateTag, EditTag, TagsList } from "../ui";

export const TagsListModal = ({
  isOpen,
  onClose,
  onSelectTag,
  tags = [],
}) => {

  // Wizard para la navegación entre vistas del modal
  const {
    step,
    direction,
    variants,
    stepData,
    goToStep,
  } = useWizard();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        key={`modal-container-${step}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.4, // Más lenta
          scale: { type: "spring", stiffness: 300, damping: 25 }, // Más lenta
        }}
      >
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            {/* Vista de Lista de tags */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                  opacity: { duration: 0.4 }, // Más lenta
                  scale: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                }}
                className="w-full"
              >
                <TagsList
                  // Filtrar la etiqueta con icon = "undefined"
                  tags={tags.filter((tag) => tag.icon !== "undefined")}
                  onSelectTag={onSelectTag}
                  goToStep={goToStep}
                  onClose={onClose}
                />
              </motion.div>
            )}

            {/* Vista de Crear una tag */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                  opacity: { duration: 0.4 }, // Más lenta
                  scale: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                }}
                className="w-full"
              >
                <CreateTag goToStep={goToStep} />
              </motion.div>
            )}

            {/* Vista de Editar una tag */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                  opacity: { duration: 0.4 }, // Más lenta
                  scale: { type: "spring", stiffness: 300, damping: 60 }, // Más lenta
                }}
                className="w-full"
              >
                <EditTag
                  goToStep={goToStep}
                  tag={stepData?.tag} // Pasar el objeto tag completo
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Dialog>
  );
};
