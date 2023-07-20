import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import SectionWrapper from "./hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.message.trim() === "") return;

    setLoading(true);

    try {
      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          {
            from_name: form.name.trim(),
            to_name: "Libamlak Birhanu",
            from_email: form.email.trim(),
            to_email: "libamlakbirhanu904@gmail.com",
            message: form.message.trim(),
          },
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        )
        .then(
          (res) => {
            setLoading(false);
            alert("Thank you, I will get back to you as soon as possible");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (err) => {
            setLoading(false);
            console.log(err);
            alert("Something went wrong.");
          }
        );
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 rounded-2xl p-8"
      >
        <p className={styles.heroSubText}>Get in touch</p>
        <h3 className={styles.heroHeadText}>Contact.</h3>

        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="font-medium mb-4 text-white">Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 text-white rounded-lg placeholder:text-secondary outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium mb-4 text-white">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 text-white rounded-lg placeholder:text-secondary outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium mb-4 text-white">Your message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's your message?"
              className="bg-tertiary py-4 px-6 text-white rounded-lg placeholder:text-secondary outline-none border-none font-medium"
            />
          </label>

          <button
            disabled={loading}
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
