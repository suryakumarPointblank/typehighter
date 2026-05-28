"use client";

import { useState, useRef, ChangeEvent } from "react";

export default function Home() {
  const [name, setName]       = useState("");
  const [mobile, setMobile]   = useState("");
  const [drName, setDrName]   = useState("");
  const [clinic, setClinic]   = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())   e.name   = "Name is required";
    if (!mobile.trim()) e.mobile = "Mobile number is required";
    if (!drName.trim()) e.drName = "Dr's name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpload = () => {
    if (validate()) fileRef.current?.click();
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubmitting(true);
    setApiError("");

    try {
      const form = new FormData();
      form.append("name",     name);
      form.append("mobile",   mobile);
      form.append("drName",   drName);
      form.append("clinic",   clinic);
      form.append("whatsapp", whatsapp ? "true" : "false");
      form.append("poster",   file);

      const res  = await fetch("/api/submit", { method: "POST", body: form });
      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
      } else {
        setApiError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page">

      {/* ── TOP LOGOS ────────────────────────── */}
      <div className="top-logos">
        <img className="top-logo-left"  src="/images/top_left_icon.png"                alt="BE Life Sciences" />
        <img className="top-logo-right" src="/images/Make_your_child_superman_logo.png" alt="Make your child a Typhighter" />
      </div>

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <img className="hero-bg" src="/images/top_middle_big_blue_strike.png" alt="" />

        <div className="hero-overlay">
          <img className="hero-cloud" src="/images/blue_cloud.png" alt="" />

          <div className="hero-row">
            <div className="hero-left">
              <img className="hero-sub-logo" src="/images/only_typehighter.png" alt="Typhighter" />
              <img className="hero-logo" src="/images/typehighter_heading_plus_umbrella.png" alt="Typhighter" />
              <div className="banners">
                <div className="banner">
                  <img className="banner-bg" src="/images/sketched_white_bg_1.png" alt="" />
                  <span className="banner-text">MONSOON PRECAUTION TIPS</span>
                </div>
                <div className="banner">
                  <img className="banner-bg" src="/images/sketched_white_bg_2.png" alt="" />
                  <span className="banner-text">POSTER COMPETITION</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <img className="hero-char" src="/images/man_plus_paint_board.png" alt="Typhighter superhero" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ────────────────────────────── */}
      {/* <section className="logos">
        <img className="logo-crm"   src="/images/crm_mother_big_logo.png"           alt="Be a CRM – Caring & Responsible Mother" />
        <img className="logo-badge" src="/images/Make_your_child_superman_logo.png" alt="Make your child a Typhighter" />
      </section> */}

      {/* ── CAMPAIGN ─────────────────────────── */}
      <section className="campaign">
        <h1 className="campaign-title">
          Get ready for <br />monsoon!
        </h1>
        <p className="campaign-desc">
          become a part of a movement that promotes awareness, encourages
          conversations, and inspires safe actions during monsoon.
        </p>

        <div className="card-wrap">
          <img className="card-bg" src="/images/giftbox_plus_pinkborder.png" alt="" />
          <p className="card-text">
            With exciting prizes, festive rewards, and a chance to get featured
            on the MySureShot webpage, TyFight is creating excitement among
            students and creators everywhere. It&apos;s your opportunity to
            showcase your talent, make an impact, and be recognized for your
            creativity. Fill your details below
          </p>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────── */}
      <section className="form-section">
        {submitted ? (
          <div className="success-box">
            <div className="success-check">✓</div>
            <h2 className="success-title">Poster Uploaded!</h2>
            <p className="success-msg">
              Thank you! Your poster has been received. We&apos;ll review it and
              get back to you soon.
            </p>
          </div>
        ) : (
          <div className="form-inner">
            <div className="field-group">
              <label className="field-label">Name</label>
              <input
                type="text"
                className={`field-input${errors.name ? " field-err" : ""}`}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {errors.name && <span className="err-text">{errors.name}</span>}
            </div>

            <div className="field-group">
              <label className="field-label">Mobile number</label>
              <input
                type="tel"
                className={`field-input${errors.mobile ? " field-err" : ""}`}
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              />
              {errors.mobile && <span className="err-text">{errors.mobile}</span>}
            </div>

            <div className="field-group">
              <label className="field-label">Dr&apos;s name</label>
              <input
                type="text"
                className={`field-input${errors.drName ? " field-err" : ""}`}
                value={drName}
                onChange={e => setDrName(e.target.value)}
              />
              {errors.drName && <span className="err-text">{errors.drName}</span>}
            </div>

            <div className="field-group">
              <label className="field-label">Clinic / Hospital you work at</label>
              <input
                type="text"
                className="field-input"
                value={clinic}
                onChange={e => setClinic(e.target.value)}
              />
            </div>

            <div className="consent-group">
              <label className="consent-label">
                <input
                  type="checkbox"
                  className="consent-check"
                  checked={whatsapp}
                  onChange={e => setWhatsapp(e.target.checked)}
                />
                I consent to receiving competition updates and festive wishes via WhatsApp
              </label>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="file-hidden"
              onChange={handleFile}
            />

            {apiError && <p className="api-error">{apiError}</p>}

            <button
              type="button"
              className="upload-btn"
              onClick={handleUpload}
              disabled={submitting}
            >
              {submitting ? "Uploading…" : "Upload your poster"}
            </button>
          </div>
        )}
      </section>

      {/* ── BOTTOM DECORATION ────────────────── */}
      <div className="bottom-decor">
        <img className="bottom-shade" src="/images/bottom_right_blue_shade.png" alt="" />
        <div className="bottom-pink-bar" />
      </div>

    </main>
  );
}
