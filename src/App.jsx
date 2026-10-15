import { useState } from "react";
import "./App.css";

const styles = [
  {
    name: "Modern",
    description: "Clean lines & timeless comfort",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Japandi",
    description: "Natural textures & calm living",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Minimal",
    description: "Less clutter, more breathing room",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Luxury",
    description: "Elegant details & rich finishes",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Scandinavian",
    description: "Light spaces & natural materials",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Bohemian",
    description: "Creative layers & earthy textures",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  },
];

const roomImages = {
  "Living Room":
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  Bedroom:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  Kitchen:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  "Dining Room":
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  "Study Room":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  Bathroom:
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=85",
  "Full Home":
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
};

const colourOptions = [
  { name: "Warm Neutrals", color: "#d7bda8" },
  { name: "Earthy Greens", color: "#9ca68b" },
  { name: "Soft Whites", color: "#eee8dd" },
  { name: "Moody & Bold", color: "#66515c" },
  { name: "Blush Tones", color: "#dba9a4" },
];

const colourPalettes = {
  "Warm Neutrals": ["#F3E9DC", "#D7BDA8", "#B08968", "#8A6A52", "#57483E"],
  "Earthy Greens": ["#E8E8D5", "#C5CBAF", "#9CA68B", "#657153", "#414B36"],
  "Soft Whites": ["#FFFFFF", "#F7F3EB", "#EEE8DD", "#D8D0C3", "#AAA092"],
  "Moody & Bold": ["#D8C8CC", "#A78B96", "#66515C", "#423640", "#28252B"],
  "Blush Tones": ["#F7E7E2", "#EBC9C3", "#DBA9A4", "#B97978", "#84585D"],
};

const initialForm = {
  roomType: "Living Room",
  style: "Modern",
  budget: "₹50,000 – ₹1,00,000",
  color: "Warm Neutrals",
  roomLength: "",
  roomWidth: "",
  requirements: "",
};

function getRoomImage(roomType) {
  return roomImages[roomType] || roomImages["Living Room"];
}

function getStyleImage(styleName) {
  return styles.find((item) => item.name === styleName)?.image || styles[0].image;
}

function getPalette(colourName) {
  return (
    colourPalettes[colourName] ||
    colourPalettes["Warm Neutrals"]
  );
}

function readSavedDesigns() {
  try {
    const stored = JSON.parse(
      localStorage.getItem("casora-designs") || "[]"
    );

    if (!Array.isArray(stored)) return [];

    return stored.map((design, index) => ({
      ...design,
      id: design.id ?? `${Date.now()}-${index}`,
    }));
  } catch {
    return [];
  }
}

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showPlanner, setShowPlanner] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState(readSavedDesigns);
  const [selectedDesign, setSelectedDesign] = useState(null);

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setGenerated(false);
    setSaved(false);
  }

  function openPlanner(chosenStyle) {
    setForm((previous) => ({
      ...previous,
      style:
        typeof chosenStyle === "string" && chosenStyle
          ? chosenStyle
          : previous.style,
    }));

    setActivePage("home");
    setShowPlanner(true);
    setGenerated(false);
    setSaved(false);
    setSelectedDesign(null);

    window.setTimeout(() => {
      document.getElementById("planner")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }

  function createConcept(event) {
    event.preventDefault();
    setGenerated(true);
    setSaved(false);

    window.setTimeout(() => {
      document.getElementById("design-result")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }

  function saveDesign() {
    const design = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...form,
      previewImage: getStyleImage(form.style),
      palette: getPalette(form.color),
      savedAt: new Date().toISOString(),
    };

    try {
      const updatedDesigns = [design, ...savedDesigns];

      localStorage.setItem(
        "casora-designs",
        JSON.stringify(updatedDesigns)
      );

      setSavedDesigns(updatedDesigns);
      setSaved(true);
    } catch (error) {
      console.error("Could not save design:", error);
      window.alert("Unable to save this design. Please try again.");
    }
  }

  function deleteDesign(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this saved design?"
    );

    if (!confirmed) return;

    const updatedDesigns = savedDesigns.filter(
      (design) => design.id !== id
    );

    try {
      localStorage.setItem(
        "casora-designs",
        JSON.stringify(updatedDesigns)
      );

      setSavedDesigns(updatedDesigns);

      if (selectedDesign?.id === id) {
        setSelectedDesign(null);
      }
    } catch (error) {
      console.error("Could not delete design:", error);
      window.alert("Unable to delete this design. Please try again.");
    }
  }

  function goHome() {
    setActivePage("home");
    setSelectedDesign(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToGallery() {
    setActivePage("gallery");
    setSelectedDesign(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedPreviewImage = getStyleImage(form.style);
  const selectedPalette = getPalette(form.color);

  return (
    <div className="casora-app">
      <header className="navbar">
        <button
          type="button"
          className="brand"
          onClick={goHome}
          aria-label="CASORA home"
        >
          <span className="brand-mark">C.</span>
          <span className="brand-name">casora</span>
        </button>

        <nav className="nav-links">
          <button
            type="button"
            className={`nav-link ${activePage === "home" ? "active" : ""}`}
            onClick={goHome}
          >
            Home
          </button>

          <button
            type="button"
            className={`nav-link ${activePage === "gallery" ? "active" : ""}`}
            onClick={goToGallery}
          >
            My Designs
            {savedDesigns.length > 0 && (
              <span className="design-count">{savedDesigns.length}</span>
            )}
          </button>

          <button
            type="button"
            className="nav-cta"
            onClick={() => openPlanner()}
          >
            Start Planning <span>↗</span>
          </button>
        </nav>
      </header>

      {activePage === "home" ? (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                YOUR SPACE, REIMAGINED
              </div>

              <h1>
                A home that
                <br />
                feels like <em>you.</em>
              </h1>

              <p className="hero-description">
                Thoughtful interiors, personal style, and a little
                imagination. Start creating a space that feels
                beautifully yours.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => openPlanner()}
                >
                  Design my room <span>↗</span>
                </button>

                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    document.getElementById("styles")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Explore styles <span>↓</span>
                </button>
              </div>

              <div className="hero-note">
                <span className="note-star">✳</span>
                <span>Your ideas. Your style. Your space.</span>
              </div>
            </div>

            <div className="hero-visual">
              <img
                className="hero-image"
                src={roomImages["Living Room"]}
                alt="Warm, elegant living room interior"
              />

              <div className="hero-image-caption">
                <span className="caption-dot" />
                <div>
                  <strong>Spaces with soul</strong>
                  <span>Made around your life</span>
                </div>
              </div>

              <div className="floating-note">
                <span className="floating-icon">✳</span>
                <div>
                  <strong>Find your style</strong>
                  <span>One room at a time</span>
                </div>
              </div>
            </div>
          </section>

          <section className="intro-strip">
            <p>GOOD DESIGN ISN'T JUST SEEN.</p>
            <p>
              IT'S <em>FELT.</em>
            </p>
            <span>
              Create a home that tells your story, in every little detail.
            </span>
          </section>

          <section className="styles-section" id="styles">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A LITTLE INSPIRATION</p>
                <h2>
                  Find your kind
                  <br />
                  of <em>beautiful.</em>
                </h2>
              </div>

              <p className="section-description">
                From understated calm to a little everyday luxury,
                discover a style that feels right for you.
              </p>
            </div>

            <div className="style-grid">
              {styles.map((item, index) => (
                <article className="style-card" key={item.name}>
                  <button
                    type="button"
                    className="style-image-button"
                    onClick={() => openPlanner(item.name)}
                    aria-label={`Create a ${item.name} room`}
                  >
                    <img src={item.image} alt={`${item.name} interior style`} />
                    <span className="style-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="style-arrow">↗</span>
                  </button>

                  <div className="style-card-info">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>

                    <button
                      type="button"
                      className="small-arrow"
                      onClick={() => openPlanner(item.name)}
                      aria-label={`Choose ${item.name} style`}
                    >
                      ↗
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="philosophy-section">
            <div className="philosophy-image-wrap">
              <img src={styles[1].image} alt="Calm natural interior" />
              <span className="image-side-label">
                THE ART OF LIVING WELL
              </span>
            </div>

            <div className="philosophy-copy">
              <p className="eyebrow">MORE THAN FOUR WALLS</p>
              <h2>
                Make room for
                <br />
                what <em>matters.</em>
              </h2>

              <p>
                Your home should work for your everyday life and reflect
                the things you love. CASORA helps you explore ideas,
                choose a direction, and shape a room around your needs.
              </p>

              <button
                type="button"
                className="text-button philosophy-button"
                onClick={() => openPlanner()}
              >
                Let's create your space <span>↗</span>
              </button>
            </div>
          </section>

          <section className="process-section">
            <div className="section-heading process-heading">
              <div>
                <p className="eyebrow">SIMPLE BY DESIGN</p>
                <h2>
                  From idea to
                  <br />
                  <em>your space.</em>
                </h2>
              </div>
            </div>

            <div className="process-grid">
              <article className="process-card">
                <span className="process-number">01</span>
                <span className="process-symbol">⌂</span>
                <h3>Tell us about your room</h3>
                <p>Choose a room, share your budget, and tell us what you need.</p>
              </article>

              <article className="process-card">
                <span className="process-number">02</span>
                <span className="process-symbol">✳</span>
                <h3>Explore your style</h3>
                <p>Pick a design direction and discover a concept built around your choices.</p>
              </article>

              <article className="process-card">
                <span className="process-number">03</span>
                <span className="process-symbol">♡</span>
                <h3>Save what you love</h3>
                <p>Keep your favourite concepts together in your own saved designs gallery.</p>
              </article>
            </div>
          </section>

          {showPlanner && (
            <section className="planner-section" id="planner">
              <div className="planner-heading">
                <p className="eyebrow">LET'S MAKE IT PERSONAL</p>
                <h2>
                  Your room,
                  <br />
                  your <em>rules.</em>
                </h2>
                <p>A few details will help you start shaping your interior concept.</p>
              </div>

              <form className="planner-form" onSubmit={createConcept}>
                <div className="form-field">
                  <label htmlFor="roomType">01 — What are we designing?</label>
                  <select
                    id="roomType"
                    value={form.roomType}
                    onChange={(event) => updateForm("roomType", event.target.value)}
                  >
                    {Object.keys(roomImages).map((room) => (
                      <option key={room}>{room}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>02 — Pick your interior style</label>
                  <div className="choice-grid">
                    {styles.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        className={`choice-chip ${form.style === item.name ? "selected" : ""}`}
                        onClick={() => updateForm("style", item.name)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="budget">03 — Your approximate budget</label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(event) => updateForm("budget", event.target.value)}
                  >
                    <option>Under ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000 – ₹3,00,000</option>
                    <option>₹3,00,000+</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>04 — Choose your colour mood</label>
                  <div className="colour-options">
                    {colourOptions.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        className={`colour-option ${form.color === item.name ? "selected" : ""}`}
                        onClick={() => updateForm("color", item.name)}
                      >
                        <span
                          className="colour-swatch"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label>05 — Room dimensions (optional)</label>
                  <div className="dimensions-grid">
                    <div>
                      <label htmlFor="roomLength">Length (feet)</label>
                      <input
                        id="roomLength"
                        type="number"
                        min="1"
                        placeholder="e.g. 12"
                        value={form.roomLength}
                        onChange={(event) => updateForm("roomLength", event.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="roomWidth">Width (feet)</label>
                      <input
                        id="roomWidth"
                        type="number"
                        min="1"
                        placeholder="e.g. 10"
                        value={form.roomWidth}
                        onChange={(event) => updateForm("roomWidth", event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="requirements">06 — What would you love to include?</label>
                  <textarea
                    id="requirements"
                    rows="4"
                    placeholder="e.g. cosy seating, indoor plants, extra storage..."
                    value={form.requirements}
                    onChange={(event) => updateForm("requirements", event.target.value)}
                  />
                </div>

                <button type="submit" className="primary-button generate-button">
                  Create my concept <span>↗</span>
                </button>

                <p className="form-note">
                  This version creates a sample concept from your selections.
                  Live AI design generation will be added separately.
                </p>
              </form>

              {generated && (
                <div className="concept-result" id="design-result">
                  <div className="concept-result-top">
                    <p className="eyebrow">YOUR DESIGN STARTS HERE</p>
                    <span className="concept-tag">SAMPLE CONCEPT</span>
                  </div>

                  <h2>Your {form.style} {form.roomType.toLowerCase()}</h2>

                  <p className="concept-description">
                    Imagine a {form.style.toLowerCase()} space with a{" "}
                    {form.color.toLowerCase()} palette, planned around your
                    budget of {form.budget.toLowerCase()}.
                    {form.requirements
                      ? ` Your ideas include: ${form.requirements}`
                      : " Add personal touches and furnishings that suit your lifestyle."}
                  </p>

                  <div className="concept-summary">
                    <div>
                      <span>ROOM</span>
                      <strong>{form.roomType}</strong>
                    </div>
                    <div>
                      <span>STYLE</span>
                      <strong>{form.style}</strong>
                    </div>
                    <div>
                      <span>COLOUR MOOD</span>
                      <strong>{form.color}</strong>
                    </div>
                    <div>
                      <span>BUDGET</span>
                      <strong>{form.budget}</strong>
                    </div>
                  </div>

                  <div style={{ margin: "24px 0" }}>
                    <h3 style={{ marginBottom: 12 }}>Your colour palette</h3>
                    <div
                      aria-label={`${form.color} colour palette`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                        gap: 8,
                      }}
                    >
                      {selectedPalette.map((colour) => (
                        <div key={colour} style={{ minWidth: 0 }}>
                          <div
                            title={colour}
                            style={{
                              backgroundColor: colour,
                              height: 64,
                              borderRadius: 8,
                              border: "1px solid rgba(0,0,0,0.10)",
                            }}
                          />
                          <span style={{ display: "block", fontSize: 11, marginTop: 6 }}>
                            {colour}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <img
                    className="concept-image"
                    src={selectedPreviewImage}
                    alt={`${form.style} interior inspiration for a ${form.roomType}`}
                  />

                  <p className="form-note">
                    This preview changes with your selected style. It is an
                    inspiration photo, not an AI-generated image of your actual room.
                  </p>

                  <button
                    type="button"
                    className="primary-button save-button"
                    onClick={saveDesign}
                    disabled={saved}
                  >
                    {saved ? "Saved to My Designs ✓" : "Save this design ♡"}
                  </button>

                  {saved && (
                    <button type="button" className="text-button" onClick={goToGallery}>
                      View My Designs <span>↗</span>
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          <section className="closing-section">
            <p className="eyebrow">A SPACE THAT FEELS LIKE HOME</p>
            <h2>
              Begin with an idea.
              <br />
              <em>Make it yours.</em>
            </h2>
            <button type="button" className="primary-button" onClick={() => openPlanner()}>
              Start your design <span>↗</span>
            </button>
          </section>
        </main>
      ) : (
        <main className="gallery-page">
          <section className="gallery-section">
            <div className="gallery-header">
              <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
              <h1>
                My Saved
                <br />
                <em>Designs.</em>
              </h1>
              <p>Every room idea you save, all in one place.</p>
            </div>

            {savedDesigns.length === 0 ? (
              <div className="empty-gallery">
                <div className="empty-gallery-icon">✳</div>
                <h2>Your collection starts here</h2>
                <p>
                  You haven't saved any designs yet. Create your first room
                  concept and keep it here.
                </p>
                <button type="button" onClick={() => openPlanner()}>
                  Create My Design
                </button>
              </div>
            ) : (
              <div className="gallery-grid">
                {savedDesigns.map((design) => {
                  const designPalette =
                    Array.isArray(design.palette) && design.palette.length
                      ? design.palette
                      : getPalette(design.color);

                  const designImage =
                    design.previewImage || getStyleImage(design.style);

                  return (
                    <article className="saved-design-card" key={design.id}>
                      <div className="saved-design-art">
                        <img
                          src={designImage || getRoomImage(design.roomType)}
                          alt={`${design.style} interior inspiration`}
                        />
                        <span className="saved-design-art-label">
                          {design.roomType.toUpperCase()}
                        </span>
                      </div>

                      <div className="saved-design-info">
                        <p className="saved-design-type">{design.roomType}</p>
                        <h2>{design.style} Interior</h2>

                        <div className="saved-design-meta">
                          <span>{design.budget}</span>
                          <span>{design.color}</span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            marginTop: 14,
                            marginBottom: 12,
                          }}
                          aria-label={`${design.color} palette`}
                        >
                          {designPalette.map((colour) => (
                            <span
                              key={colour}
                              title={colour}
                              style={{
                                display: "block",
                                flex: 1,
                                height: 22,
                                backgroundColor: colour,
                                borderRadius: 4,
                                border: "1px solid rgba(0,0,0,0.08)",
                              }}
                            />
                          ))}
                        </div>

                        <p className="saved-design-date">
                          Saved{" "}
                          {design.savedAt
                            ? new Date(design.savedAt).toLocaleDateString()
                            : "previously"}
                        </p>

                        <div className="saved-design-actions">
                          <button
                            type="button"
                            className="gallery-details-button"
                            onClick={() =>
                              setSelectedDesign(
                                selectedDesign?.id === design.id ? null : design
                              )
                            }
                          >
                            {selectedDesign?.id === design.id
                              ? "Hide Details"
                              : "View Details"}
                          </button>

                          <button
                            type="button"
                            className="gallery-delete-button"
                            onClick={() => deleteDesign(design.id)}
                          >
                            Delete
                          </button>
                        </div>

                        {selectedDesign?.id === design.id && (
                          <div className="saved-design-details">
                            <h3>Design Details</h3>
                            <p><strong>Room:</strong> {design.roomType}</p>
                            <p><strong>Style:</strong> {design.style}</p>
                            <p><strong>Budget:</strong> {design.budget}</p>
                            <p><strong>Colour mood:</strong> {design.color}</p>
                            <p>
                              <strong>Room size:</strong>{" "}
                              {design.roomLength || "Not provided"} ×{" "}
                              {design.roomWidth || "Not provided"} feet
                            </p>
                            <p>
                              <strong>Requirements:</strong>{" "}
                              {design.requirements || "None added"}
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <button type="button" className="gallery-back-button" onClick={goHome}>
              ← Back to Home
            </button>
          </section>
        </main>
      )}

      <footer className="footer">
        <button type="button" className="footer-brand" onClick={goHome}>
          <span className="brand-mark">C.</span>
          <span className="brand-name">casora</span>
        </button>

        <p>Make space for the life you love.</p>

        <span className="footer-copyright">
          © {new Date().getFullYear()} CASORA
        </span>
      </footer>
    </div>
  );
}

export default App;