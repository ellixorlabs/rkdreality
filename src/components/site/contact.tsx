"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";

type ContactInfo = {
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  hours?: string;
};

const fieldClass =
  "h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none transition-all duration-200 hover:border-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/15";

const triggerClass =
  "h-11 w-full rounded-sm border-input bg-background transition-colors duration-200 hover:border-gold/50 data-[state=open]:border-gold";

const formContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const formItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Contact({
  contact,
  propertyTypes = [],
  cities = [],
}: {
  contact?: ContactInfo;
  propertyTypes?: string[];
  cities?: string[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [interest, setInterest] = useState("");
  const [city, setCity] = useState("");

  const address = contact?.address;
  const hours = contact?.hours;

  const channels = [
    contact?.phone && {
      icon: Phone,
      label: "Call us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    contact?.whatsappNumber && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.phone ?? contact.whatsappNumber,
      href: `https://wa.me/${contact.whatsappNumber}`,
    },
    contact?.email && {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ].filter(Boolean) as {
    icon: typeof Phone;
    label: string;
    value: string;
    href: string;
  }[];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1100);
  }

  return (
    <section id="contact" className="relative scroll-mt-20 bg-sand/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-sm border border-border bg-card shadow-[0_40px_90px_-60px_rgba(27,42,31,0.5)] lg:grid-cols-12"
        >
          {/* Left — advisor panel */}
          <div className="grain relative flex flex-col justify-between bg-forest-deep p-8 text-ivory sm:p-10 lg:col-span-5">
            <div className="relative">
              <span className="kicker text-gold-soft">
                <span className="h-px w-8 bg-gold-soft" />
                Book a Consultation
              </span>
              <h2 className="mt-6 font-serif text-3xl leading-[1.1] tracking-tight text-ivory text-balance sm:text-4xl">
                Speak to a land advisor — not a salesperson.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ivory/70">
                Tell us what you&rsquo;re looking for. We&rsquo;ll arrange a free
                site visit, share verified documents, and answer every question
                before you commit to anything.
              </p>
            </div>

            <ul className="relative mt-10 space-y-5">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="group flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-sm border border-ivory/20 text-gold-soft transition-colors group-hover:border-gold-soft/60">
                      <c.icon className="size-4.5" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] uppercase tracking-[0.16em] text-ivory/50">
                        {c.label}
                      </span>
                      <span className="text-ivory/90 transition-colors group-hover:text-gold-soft">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {(address || hours) && (
              <div className="relative mt-10 space-y-2 border-t border-ivory/15 pt-6 text-sm text-ivory/70">
                {address && (
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold-soft" />
                    {address}
                  </p>
                )}
                {hours && (
                  <p className="flex items-center gap-2">
                    <Clock className="size-4 text-gold-soft" />
                    {hours}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right — form */}
          <div className="relative p-8 sm:p-10 lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                  >
                    <CheckCircle2 className="size-14 text-forest" />
                  </motion.div>
                  <h3 className="mt-6 font-serif text-3xl text-foreground">
                    Request received.
                  </h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thank you. A dedicated RKD advisor will call you within one
                    business hour to confirm your site visit and share verified
                    documentation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={formContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-70px" }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <motion.div variants={formItem} className="flex items-center gap-2 text-forest">
                    <CalendarCheck className="size-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.14em]">
                      Site Visit Booking
                    </span>
                  </motion.div>

                  <motion.div variants={formItem} className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <input id="name" required placeholder="Your name" className={fieldClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 "
                        className={fieldClass}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formItem} className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      className={fieldClass}
                    />
                  </motion.div>

                  <motion.div variants={formItem} className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Interested in</Label>
                      <Select value={interest} onValueChange={(v) => setInterest(v ?? "")}>
                        <SelectTrigger className={triggerClass}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred location</Label>
                      <Select value={city} onValueChange={(v) => setCity(v ?? "")}>
                        <SelectTrigger className={triggerClass}>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  <motion.div variants={formItem} className="space-y-2">
                    <Label htmlFor="date">Preferred visit date</Label>
                    <input id="date" type="date" className={fieldClass} />
                  </motion.div>

                  <motion.div variants={formItem} className="space-y-2">
                    <Label htmlFor="message">Anything specific? (optional)</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Budget range, questions, or a project you saw…"
                      className="rounded-sm border-input bg-background transition-all duration-200 hover:border-gold/50 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/15"
                    />
                  </motion.div>

                  <motion.div variants={formItem}>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-6 py-4 text-sm font-medium text-ivory shadow-sm transition-colors duration-300 hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="size-4" />
                          Request My Free Site Visit
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                  <motion.p variants={formItem} className="text-xs text-muted-foreground">
                    By submitting, you agree to be contacted by RKD Reality. We
                    never share your details.
                  </motion.p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
