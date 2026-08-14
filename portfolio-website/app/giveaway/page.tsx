"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type GiveawayStatus =
  | "loading"
  | "pending"
  | "open"
  | "closed"
  | "winner_selected"
  | "error";

type GiveawayResponse = {
  status: Exclude<
    GiveawayStatus,
    "loading" | "error"
  >;
  winnerUsername: string | null;
  giveawayDate: string | null;
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const GIVEAWAY_API_URL =
  "https://byvafwruuafjgeqtzetu.supabase.co/functions/v1/giveaway-function";

function cleanTikTokUsername(value: string) {
  return value
    .trim()
    .replace(/^@+/, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

/*
 * Creates one anonymous ID for this browser.
 *
 * It stays in localStorage so the Edge Function
 * can work out DAU without us storing someone's
 * name/email/TikTok account for analytics.
 */
function getVisitorId() {
  const key =
    "dannysoftdev_giveaway_visitor_id";

  try {
    const existing =
      localStorage.getItem(key);

    if (existing) {
      return existing;
    }

    const newId =
      crypto.randomUUID();

    localStorage.setItem(
      key,
      newId
    );

    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

export default function GiveawayPage() {
  const [username, setUsername] =
    useState("");

  const [story, setStory] =
    useState("");

  const [confirmed, setConfirmed] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  const [
    giveawayStatus,
    setGiveawayStatus,
  ] =
    useState<GiveawayStatus>(
      "loading"
    );

  const [
    winnerUsername,
    setWinnerUsername,
  ] =
    useState<string | null>(
      null
    );

  const [
    giveawayDate,
    setGiveawayDate,
  ] =
    useState<string | null>(
      null
    );

  const [
    countdown,
    setCountdown,
  ] =
    useState<Countdown | null>(
      null
    );

  /*
   * Stops React development mode from
   * accidentally firing analytics twice.
   */
  const visitTracked =
    useRef(false);

  // =====================================================
  // LOAD GIVEAWAY STATUS
  // =====================================================

  useEffect(() => {
    async function loadGiveaway() {
      try {
        const response =
          await fetch(
            GIVEAWAY_API_URL,
            {
              method: "GET",
              cache: "no-store",

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        const data =
          (await response.json()) as
            | GiveawayResponse
            | {
                error?: string;
              };

        if (
          !response.ok ||
          !("status" in data)
        ) {
          console.error(
            "Giveaway API error:",
            response.status,
            data
          );

          throw new Error(
            "error" in data &&
              data.error
              ? data.error
              : "Could not load giveaway status."
          );
        }

        setGiveawayStatus(
          data.status
        );

        setWinnerUsername(
          data.winnerUsername ??
            null
        );

        setGiveawayDate(
          data.giveawayDate ??
            null
        );
      } catch (error) {
        console.error(
          "Giveaway status error:",
          error
        );

        setGiveawayStatus(
          "error"
        );
      }
    }

    loadGiveaway();
  }, []);

  // =====================================================
  // TRACK PAGE VIEW + DAU
  // =====================================================

  useEffect(() => {
    if (
      visitTracked.current
    ) {
      return;
    }

    visitTracked.current =
      true;

    async function trackVisit() {
      try {
        const visitorId =
          getVisitorId();

        const response =
          await fetch(
            GIVEAWAY_API_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify({
                  action:
                    "track_visit",

                  visitorId,
                }),
            }
          );

        if (!response.ok) {
          const data =
            await response
              .json()
              .catch(
                () => null
              );

          console.warn(
            "Giveaway analytics failed:",
            response.status,
            data
          );
        }
      } catch (error) {
        /*
         * Analytics should NEVER stop
         * the giveaway page from working.
         */
        console.warn(
          "Could not track visit:",
          error
        );
      }
    }

    trackVisit();
  }, []);

  // =====================================================
  // COUNTDOWN
  // =====================================================

  useEffect(() => {
    if (!giveawayDate) {
      setCountdown(null);
      return;
    }

    const targetDate =
      new Date(
        giveawayDate
      ).getTime();

    if (
      Number.isNaN(
        targetDate
      )
    ) {
      console.error(
        "Invalid giveaway_date:",
        giveawayDate
      );

      setCountdown(null);
      return;
    }

    function updateCountdown() {
      const difference =
        Math.max(
          0,
          targetDate -
            Date.now()
        );

      const days =
        Math.floor(
          difference /
            (
              1000 *
              60 *
              60 *
              24
            )
        );

      const hours =
        Math.floor(
          (
            difference /
            (
              1000 *
              60 *
              60
            )
          ) %
            24
        );

      const minutes =
        Math.floor(
          (
            difference /
            (
              1000 *
              60
            )
          ) %
            60
        );

      const seconds =
        Math.floor(
          (
            difference /
            1000
          ) %
            60
        );

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    }

    updateCountdown();

    const timer =
      window.setInterval(
        updateCountdown,
        1000
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [giveawayDate]);

  // =====================================================
  // SUBMIT ENTRY
  // =====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      giveawayStatus !==
      "open"
    ) {
      setFormError(
        "The giveaway is not currently accepting entries."
      );

      return;
    }

    if (
      !username.trim() ||
      !story.trim() ||
      !confirmed ||
      submitting
    ) {
      return;
    }

    const cleanUsername =
      cleanTikTokUsername(
        username
      );

    const cleanStory =
      story.trim();

    const formData =
      new FormData(
        event.currentTarget
      );

    const website =
      String(
        formData.get(
          "website"
        ) ?? ""
      );

    setSubmitting(true);
    setFormError("");

    try {
      const response =
        await fetch(
          GIVEAWAY_API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                action:
                  "submit_entry",

                username:
                  cleanUsername,

                story:
                  cleanStory,

                confirmed,

                website,
              }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          username?: string;
          error?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        setFormError(
          data.error ??
            "Something went wrong. Please try again."
        );

        return;
      }

      setUsername(
        data.username ??
          cleanUsername
      );

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Giveaway submission error:",
        error
      );

      setFormError(
        "Could not submit your entry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // =====================================================
  // STATUS LABEL
  // =====================================================

  const statusLabel =
    giveawayStatus ===
    "loading"
      ? "CHECKING STATUS"
      : giveawayStatus ===
          "pending"
        ? "COMING SOON"
        : giveawayStatus ===
            "open"
          ? "GIVEAWAY OPEN"
          : giveawayStatus ===
              "closed"
            ? "ENTRIES CLOSED"
            : giveawayStatus ===
                "winner_selected"
              ? "WINNER SELECTED"
              : "STATUS UNAVAILABLE";

  return (
    <main
      className={`giveaway-page status-${giveawayStatus}`}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      {/* ===============================================
          NAVIGATION
      =============================================== */}

      <header className="nav">
        <a
          href="/"
          className="brand"
          aria-label="DannySoftDev home"
        >
          <span className="brand-mark">
            <span />
            <span />
          </span>

          <span>
            DANNYSOFTDEV
          </span>
        </a>

        <div className="nav-right">
          <span
            className={`status status-${giveawayStatus}`}
          >
            <span className="status-dot" />

            {statusLabel}
          </span>

          <span className="index">
            001
          </span>
        </div>
      </header>

      {/* ===============================================
          WINNER MODE
      =============================================== */}

      {giveawayStatus ===
      "winner_selected" ? (
        <section className="winner-page">
          <div className="winner-grid" />

          <div className="winner-content">
            <div className="winner-meta reveal reveal-one">
              <span>
                COMMUNITY / GIVEAWAY
              </span>

              <span>
                DRAW COMPLETE
              </span>
            </div>

            <div className="winner-main">
              <p className="winner-kicker reveal reveal-two">
                DANNYSOFTDEV TECH
                GIVEAWAY
              </p>

              <h1 className="winner-title">
                <span className="reveal reveal-three">
                  WE HAVE
                </span>

                <span className="winner-title-outline reveal reveal-four">
                  A WINNER.
                </span>
              </h1>

              <div className="winner-handle reveal reveal-five">
                <span>
                  @
                </span>

                <strong>
                  {winnerUsername ??
                    "unknown"}
                </strong>
              </div>
            </div>

            <div className="winner-bottom reveal reveal-five">
              <p>
                THANK YOU TO EVERYONE
                WHO ENTERED.
                <br />
                KEEP AN EYE OUT FOR THE
                NEXT ONE
              </p>

              {winnerUsername && (
                <a
                  href={`https://www.tiktok.com/@${winnerUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="winner-link"
                >
                  VIEW WINNER ↗
                </a>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* =============================================
              HERO
          ============================================= */}

          <section className="hero">
            <div className="hero-meta reveal reveal-one">
              <span>
                COMMUNITY / GIVEAWAY
              </span>

              <span>
                2026
              </span>
            </div>

            <div className="hero-title-wrap">
              <p className="eyebrow reveal reveal-two">
                A SMALL THANK YOU TO THE
                PEOPLE WHO&apos;VE BEEN
                HERE.
              </p>

              <h1 className="hero-title">
                <span className="title-line reveal reveal-three">
                  DANNYSOFTDEV
                </span>

                <span className="title-line title-outline reveal reveal-four">
                  TECH GIVEAWAY
                </span>
              </h1>
            </div>

            <div className="hero-bottom reveal reveal-five">
              <p>
                No sponsor. No brand
                deal.
                <br />
                Just something from me
                to you.
              </p>

              {giveawayStatus ===
              "open" ? (
                <a
                  href="#enter"
                  className="scroll-link"
                >
                  <span>
                    ENTER GIVEAWAY
                  </span>

                  <span className="arrow">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 5V19M12 19L18 13M12 19L6 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              ) : (
                <span className="inactive-cta">
                  {giveawayStatus ===
                  "pending"
                    ? "COMING SOON"
                    : giveawayStatus ===
                        "closed"
                      ? "ENTRIES CLOSED"
                      : giveawayStatus ===
                          "loading"
                        ? "CHECKING STATUS"
                        : "UNAVAILABLE"}
                </span>
              )}
            </div>
          </section>

          {/* =============================================
              COUNTDOWN

              giveawayDate comes directly from:
              giveaway_settings.giveaway_date
          ============================================= */}

          {giveawayStatus === "open" && countdown && (
            <section className="countdown-section">
              <div className="countdown-top">
                <span className="countdown-index">
                  00
                </span>

                <p>
                  GIVEAWAY COUNTDOWN
                </p>
              </div>

              <div className="countdown-grid">
                <div className="countdown-unit">
                  <strong>
                    {String(
                      countdown.days
                    ).padStart(
                      3,
                      "0"
                    )}
                  </strong>

                  <span>
                    DAYS
                  </span>
                </div>

                <div className="countdown-unit">
                  <strong>
                    {String(
                      countdown.hours
                    ).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <span>
                    HOURS
                  </span>
                </div>

                <div className="countdown-unit">
                  <strong>
                    {String(
                      countdown.minutes
                    ).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <span>
                    MIN
                  </span>
                </div>

                <div className="countdown-unit">
                  <strong>
                    {String(
                      countdown.seconds
                    ).padStart(
                      2,
                      "0"
                    )}
                  </strong>

                  <span>
                    SEC
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* =============================================
              RULES
          ============================================= */}

          <section className="rules-section">
            <p className="section-label">
              NEED TO KNOW
            </p>

            <div className="rules">
              <article>
                <span>
                  01
                </span>

                <h3>
                  ONE ENTRY
                </h3>

                <p>
                  One valid entry per
                  TikTok username.
                </p>
              </article>

              <article>
                <span>
                  02
                </span>

                <h3>
                  FOLLOWING
                </h3>

                <p>
                  You don&apos;t have
                  to follow me to enter.
                  Follow if you want to.
                </p>
              </article>

              <article>
                <span>
                  03
                </span>

                <h3>
                  RANDOM DRAW
                </h3>

                <p>
                  The final winner will
                  be selected randomly
                  from valid entries.
                </p>
              </article>

              <article>
                <span>
                  04
                </span>

                <h3>
                  CONTACT
                </h3>

                <p>
                  The winner will only
                  be contacted by me
                  through my TikTok
                  account.
                </p>
              </article>
            </div>
          </section>

          {/* =============================================
              ENTRY
          ============================================= */}

          <section
            className="entry-section"
            id="enter"
          >
            <div className="entry-heading">
              <div className="section-number light">
                02
              </div>

              <div>
                <p className="section-label light-label">
                  YOUR ENTRY
                </p>

                <h2>
                  ONE QUESTION.
                  <br />

                  <span>
                    ONE ENTRY.
                  </span>
                </h2>
              </div>
            </div>

            {/* ===========================================
                LOADING
            =========================================== */}

            {giveawayStatus ===
            "loading" ? (
              <div className="state-panel">
                <p className="section-label light-label">
                  CHECKING STATUS
                </p>

                <h2>
                  ONE
                  <br />

                  <span>
                    SECOND.
                  </span>
                </h2>

                <p className="success-small">
                  Checking whether
                  entries are currently
                  open.
                </p>
              </div>
            ) : giveawayStatus ===
              "pending" ? (
              /* =========================================
                  PENDING
              ========================================= */

              <div className="state-panel">
                <p className="section-label light-label">
                  COMING SOON
                </p>

                <h2>
                  NOT
                  <br />

                  <span>
                    YET.
                  </span>
                </h2>

                <p className="success-small">
                  The giveaway is not
                  open yet. Keep an eye
                  on TikTok.
                </p>
              </div>
            ) : giveawayStatus ===
              "closed" ? (
              /* =========================================
                  CLOSED
              ========================================= */

              <div className="state-panel">
                <p className="section-label light-label">
                  ENTRIES CLOSED
                </p>

                <h2>
                  THAT&apos;S
                  <br />

                  <span>
                    A WRAP.
                  </span>
                </h2>

                <p className="success-small">
                  Entries are closed.
                  The winner will be
                  announced here once
                  selected.
                </p>
              </div>
            ) : giveawayStatus ===
              "error" ? (
              /* =========================================
                  ERROR
              ========================================= */

              <div className="state-panel">
                <p className="section-label light-label">
                  STATUS UNAVAILABLE
                </p>

                <h2>
                  TRY
                  <br />

                  <span>
                    AGAIN.
                  </span>
                </h2>

                <p className="success-small">
                  I couldn&apos;t load
                  the giveaway right
                  now. Refresh the page
                  and try again.
                </p>
              </div>
            ) : !submitted ? (
              /* =========================================
                  ENTRY FORM
              ========================================= */

              <form
                className="entry-form"
                onSubmit={
                  handleSubmit
                }
              >
                {/* Honeypot */}

                <input
                  className="honeypot"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* TikTok Username */}

                <div className="form-row">
                  <span className="form-index">
                    01
                  </span>

                  <div className="field">
                    <label htmlFor="username">
                      TikTok username
                    </label>

                    <div className="username-input">
                      <span>
                        @
                      </span>

                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={
                          false
                        }
                        value={
                          username
                        }
                        onChange={(
                          event
                        ) =>
                          setUsername(
                            event.target.value
                              .replace(
                                /^@/,
                                ""
                              )
                              .replace(
                                /\s/g,
                                ""
                              )
                          )
                        }
                        placeholder="yourusername"
                        maxLength={
                          24
                        }
                        required
                      />
                    </div>

                    <p>
                      Make sure this is
                      correct. This is
                      the account
                      I&apos;ll contact
                      if you win.
                    </p>
                  </div>
                </div>

                {/* Tech Question */}

                <div className="form-row">
                  <span className="form-index">
                    02
                  </span>

                  <div className="field">
                    <label htmlFor="story">
                      What got you
                      interested in
                      tech?
                    </label>

                    <textarea
                      id="story"
                      name="story"
                      value={
                        story
                      }
                      onChange={(
                        event
                      ) =>
                        setStory(
                          event.target
                            .value
                        )
                      }
                      placeholder="Tell me your story..."
                      maxLength={
                        500
                      }
                      required
                    />

                    <div className="character-count">
                      {story.length
                        .toString()
                        .padStart(
                          3,
                          "0"
                        )}{" "}
                      / 500
                    </div>
                  </div>
                </div>

                {/* Confirmation */}

                <div className="confirmation-row">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={
                        confirmed
                      }
                      onChange={(
                        event
                      ) =>
                        setConfirmed(
                          event.target
                            .checked
                        )
                      }
                    />

                    <span className="custom-checkbox">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.5 8L6.5 11L12.5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span>
                      I&apos;ve entered
                      my TikTok username
                      correctly and I
                      agree to the
                      giveaway rules.
                    </span>
                  </label>
                </div>

                {/* Form Error */}

                {formError && (
                  <div
                    className="form-error"
                    role="alert"
                  >
                    <span>
                      !
                    </span>

                    <p>
                      {formError}
                    </p>
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={
                    submitting ||
                    !username.trim() ||
                    !story.trim() ||
                    !confirmed
                  }
                >
                  <span>
                    {submitting
                      ? "SUBMITTING..."
                      : "ENTER GIVEAWAY"}
                  </span>

                  <span className="submit-arrow">
                    {submitting
                      ? "•••"
                      : "↗"}
                  </span>
                </button>
              </form>
            ) : (
              /* =========================================
                  SUCCESS
              ========================================= */

              <div className="success">
                <div className="success-icon">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M11 20.5L17 26.5L29.5 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="section-label light-label">
                  ENTRY RECEIVED
                </p>

                <h2>
                  YOU&apos;RE
                  <br />

                  <span>
                    IN.
                  </span>
                </h2>

                <p className="success-copy">
                  Your entry has been
                  recorded as{" "}

                  <strong>
                    @{username}
                  </strong>
                  .
                </p>

                <p className="success-small">
                  Keep an eye on TikTok.
                  The winner will be
                  contacted directly
                  from the official
                  DannySoftDev account.
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {/* ===============================================
          FOOTER
      =============================================== */}

      <footer className="footer">
        <a
          href="/"
          className="footer-logo"
        >
          DANNY
          <br />
          SOFTDEV
        </a>

        <div className="footer-middle">
          <span>
            BUILT BY DANNYSOFTDEV
          </span>

          <span>
            JOHANNESBURG / ZA
          </span>
        </div>

        <a
          href="https://www.tiktok.com/@dannysoftdev"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          TIKTOK ↗
        </a>
      </footer>
    </main>
  );
}