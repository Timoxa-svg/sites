import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import GradientButton from "./GradientButton";
import Confetti from "react-confetti";

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const formData = watch();

  const calculateProgress = () => {
    let filledFields = 0;
    if (formData.name?.trim()) filledFields++;
    if (formData.phone?.trim()) filledFields++;
    if (formData.telegram?.trim()) filledFields++;
    if (formData.message?.trim()) filledFields++;
    if (formData.file?.length > 0) filledFields++;
    setFormProgress((filledFields / 5) * 100);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("phone", data.phone);
    formDataToSend.append("telegram", data.telegram);
    formDataToSend.append("message", data.message);
    if (data.file[0]) formDataToSend.append("file", data.file[0]);

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSuccess(true);
        setSubmitMessage("Анкета успешно отправлена!");
        setShowConfetti(true);
        reset();
        setFormProgress(0);
        setTimeout(() => {
          setIsSuccess(false);
          setShowConfetti(false);
        }, 5000);
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      setSubmitMessage("Сервер недоступен. Попробуйте позже.");
      setTimeout(() => setSubmitMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <section
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70"
      id="contact-form"
    >
      {showConfetti && <Confetti />}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="flex flex-col lg:flex-row items-start gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-200 text-lg font-inter mb-8 leading-relaxed">
            Заполните форму, и мы свяжемся с вами в кратчайшие сроки для обсуждения вашего проекта.
          </p>
          <motion.div
            className="w-24 h-1 bg-gradient-primary rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:w-1/2 max-w-xl"
        >
          <div className="bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-cyan-500/30 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-50 -z-10" />
            <motion.div
              className="mb-6"
              initial="hidden"
              whileInView="visible"
              variants={fieldVariants}
              custom={0}
              viewport={{ once: true }}
            >
              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-primary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2 font-inter">Прогресс заполнения: {Math.round(formProgress)}%</p>
            </motion.div>
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-2xl z-50"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                    transition={{ duration: 1.5 }}
                    className="flex flex-col items-center"
                  >
                    <CheckCircleIcon className="w-16 h-16 text-cyan-400" />
                    <p className="text-white text-lg mt-4 font-inter">Анкета успешно отправлена!</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleSubmit(onSubmit)} onChange={calculateProgress}>
              {[
                { label: "Имя", name: "name", validation: { required: "Имя обязательно" } },
                {
                  label: "Номер телефона",
                  name: "phone",
                  validation: {
                    required: "Номер телефона обязателен",
                    pattern: { value: /^\+?\d{10,15}$/, message: "Некорректный номер телефона" },
                  },
                },
                { label: "Telegram (опционально)", name: "telegram", placeholder: "@yourusername" },
                { label: "Какой у вас запрос?", name: "message", validation: { required: "Сообщение обязательно" }, textarea: true },
                {
                  label: "Прикрепить файл (до 5 МБ)",
                  name: "file",
                  type: "file",
                  validation: {
                    validate: (files) => {
                      if (files[0] && files[0].size > 5 * 1024 * 1024) {
                        return "Файл не должен превышать 5 МБ";
                      }
                      return true;
                    },
                  },
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  className="mb-6"
                  initial="hidden"
                  whileInView="visible"
                  variants={fieldVariants}
                  custom={index + 1}
                  viewport={{ once: true }}
                >
                  <label htmlFor={field.name} className="block text-gray-200 font-semibold mb-2 font-inter">
                    {field.label}
                  </label>
                  {field.textarea ? (
                    <motion.textarea
                      {...register(field.name, field.validation)}
                      whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                      className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${
                        errors[field.name] ? "border-red-500" : "border-cyan-500/30"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                      rows="5"
                    />
                  ) : field.type === "file" ? (
                    <motion.input
                      type="file"
                      {...register(field.name, field.validation)}
                      whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                      className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${
                        errors[field.name] ? "border-red-500" : "border-cyan-500/30"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600`}
                    />
                  ) : (
                    <motion.input
                      {...register(field.name, field.validation)}
                      placeholder={field.placeholder}
                      whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                      className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${
                        errors[field.name] ? "border-red-500" : "border-cyan-500/30"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                    />
                  )}
                  {errors[field.name] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center font-inter"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {errors[field.name].message}
                    </motion.p>
                  )}
                </motion.div>
              ))}
              <GradientButton type="submit" disabled={isSubmitting} className="animate-pulse-slow">
                {isSubmitting ? "Отправка..." : "Отправить"}
              </GradientButton>
              {submitMessage && !isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center ${
                    submitMessage.includes("успешно") ? "text-green-400" : "text-red-400"
                  } font-inter`}
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}