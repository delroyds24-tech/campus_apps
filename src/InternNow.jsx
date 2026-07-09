import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Clock3, Bookmark, BookmarkCheck, MessageCircle, User,
  Home, ClipboardList, Plus, ChevronLeft, Star, Check, X, Upload,
  SlidersHorizontal, Building2, GraduationCap, Send, Sparkles,
  Calendar, LogOut, ThumbsUp, ThumbsDown, Ticket, Briefcase
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const STUDENT_NAME = "Aria Fernandes";
const COMPANY_NAME = "Nimbus Labs";

const internshipsSeed = [
  { id: "in-1", company: "Nimbus Labs", initial: "N", color: "#2F6FED", role: "Frontend Engineering Intern", type: "Remote", location: "Anywhere", duration: "3 months", stipend: "₹25,000/mo", deadline: 5, tags: ["React", "Paid", "Remote"], match: 94, ticketNo: "NB-2214", desc: "Build customer-facing dashboards with our design systems team. You'll ship real features in week one, no coffee-fetching involved." },
  { id: "in-2", company: "Terra Robotics", initial: "T", color: "#E1432B", role: "Hardware R&D Intern", type: "On-site", location: "Bengaluru", duration: "6 months", stipend: "₹30,000/mo", deadline: 2, tags: ["Hardware", "Onsite", "Paid"], match: 81, ticketNo: "TR-0091", desc: "Prototype actuator assemblies for our warehouse robots. Steel-toe boots provided, curiosity is not." },
  { id: "in-3", company: "Fable & Co", initial: "F", color: "#8A4FE0", role: "Brand Design Intern", type: "Hybrid", location: "Goa", duration: "4 months", stipend: "Unpaid + Stipend", deadline: 12, tags: ["Design", "Hybrid"], match: 76, ticketNo: "FC-3350", desc: "Help rebuild our visual identity from the ground up. Portfolio pieces guaranteed, ramen budget not included." },
  { id: "in-4", company: "Northline Bank", initial: "N", color: "#2F7A4D", role: "Data Analytics Intern", type: "On-site", location: "Mumbai", duration: "2 months", stipend: "₹20,000/mo", deadline: 8, tags: ["SQL", "Finance", "Paid"], match: 69, ticketNo: "NL-7712", desc: "Crunch transaction data to catch fraud before it happens. Spreadsheets so big they need their own zip code." },
  { id: "in-5", company: "Loop Studio", initial: "L", color: "#C98A12", role: "Motion Design Intern", type: "Remote", location: "Anywhere", duration: "3 months", stipend: "₹15,000/mo", deadline: 20, tags: ["After Effects", "Remote"], match: 88, ticketNo: "LP-1183", desc: "Animate explainer videos for clients who say 'make it pop' a lot. You'll learn to translate that into actual keyframes." },
  { id: "in-6", company: "Nimbus Labs", initial: "N", color: "#2F6FED", role: "Backend Engineering Intern", type: "Hybrid", location: "Pune", duration: "6 months", stipend: "₹28,000/mo", deadline: 15, tags: ["Node.js", "Hybrid", "Paid"], match: 72, ticketNo: "NB-2215", desc: "Own an API surface end to end. Uptime is a personality trait here." },
];

const companyListingsSeed = [
  { id: "cl-1", role: "Frontend Engineering Intern", type: "Remote", duration: "3 months", posted: "4 days ago", status: "Open", applicants: [
    { name: "Aria Fernandes", school: "BITS Pilani", match: 94, status: "New", initial: "A", color: "#2F6FED" },
    { name: "Rohan Iyer", school: "VJTI Mumbai", match: 88, status: "Shortlisted", initial: "R", color: "#8A4FE0" },
    { name: "Meera Nair", school: "NIT Trichy", match: 72, status: "New", initial: "M", color: "#E1432B" },
  ]},
  { id: "cl-2", role: "Backend Engineering Intern", type: "Hybrid", duration: "6 months", posted: "1 week ago", status: "Open", applicants: [
    { name: "Devika Rao", school: "IIIT Hyderabad", match: 91, status: "Interview", initial: "D", color: "#2F7A4D" },
    { name: "Karan Shah", school: "DA-IICT", match: 64, status: "New", initial: "K", color: "#C98A12" },
  ]},
  { id: "cl-3", role: "Product Design Intern", type: "On-site", duration: "3 months", posted: "2 weeks ago", status: "Closed", applicants: [] },
];

const chatSeed = [
  { id: "c1", name: "Nimbus Labs", initial: "N", color: "#2F6FED", last: "Great, can you share your GitHub too?", time: "9:41", unread: 2 },
  { id: "c2", name: "Terra Robotics", initial: "T", color: "#E1432B", last: "We'd like to move you to interview.", time: "Yesterday", unread: 0 },
  { id: "c3", name: "Loop Studio", initial: "L", color: "#C98A12", last: "Thanks for applying! Reviewing now.", time: "Mon", unread: 0 },
];

/* -------------------------------- HELPERS --------------------------------- */

function Barcode({ seed, height = 34 }) {
  const bars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < seed.length; i++) {
      const code = seed.charCodeAt(i);
      arr.push((code % 3) + 1);
    }
    while (arr.length < 18) arr.push(((arr.length * 7) % 3) + 1);
    return arr;
  }, [seed]);
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 2, height }}>
      {bars.map((w, i) => (
        <div key={i} style={{ width: w * 1.6, background: "var(--ink)", opacity: i % 5 === 0 ? 0.4 : 1 }} />
      ))}
    </div>
  );
}

function Stamp({ children, color = "var(--stamp)" }) {
  return (
    <div className="stamp" style={{ color, borderColor: color }}>
      {children}
    </div>
  );
}

function TagChip({ children }) {
  return <span className="tag">{children}</span>;
}

function MatchRing({ value }) {
  const c = 2 * Math.PI * 16;
  const off = c - (value / 100) * c;
  const color = value >= 85 ? "var(--ok)" : value >= 70 ? "var(--highlight)" : "var(--muted)";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--line)" strokeWidth="4" />
      <circle
        cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 20 20)"
      />
      <text x="20" y="24" textAnchor="middle" fontSize="10" fontFamily="'IBM Plex Mono', monospace" fill="var(--ink)">{value}</text>
    </svg>
  );
}

/* ------------------------------- TICKET CARD ------------------------------- */

function TicketCard({ item, saved, onToggleSave, onOpen, appliedStatus }) {
  return (
    <div className="ticket" onClick={() => onOpen(item)}>
      <div className="ticket-main">
        <div className="ticket-top">
          <div className="logo" style={{ background: item.color }}>{item.initial}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="role-title">{item.role}</div>
            <div className="company-name">{item.company}</div>
          </div>
          <button
            className="icon-btn"
            onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
            aria-label="Save"
          >
            {saved ? <BookmarkCheck size={18} color="var(--stamp)" /> : <Bookmark size={18} color="var(--muted)" />}
          </button>
        </div>
        <div className="ticket-meta">
          <span><MapPin size={12} /> {item.location}</span>
          <span><Clock3 size={12} /> {item.duration}</span>
          <span className="mono">{item.stipend}</span>
        </div>
        <div className="ticket-tags">
          {item.tags.map((t) => <TagChip key={t}>{t}</TagChip>)}
        </div>
        {appliedStatus && (
          <div className="applied-row mono">
            <Check size={12} /> {appliedStatus}
          </div>
        )}
      </div>
      <div className="ticket-stub">
        <div className="notch notch-top" />
        <MatchRing value={item.match} />
        <div className="stub-label mono">MATCH</div>
        <Stamp color={item.deadline <= 3 ? "var(--stamp)" : "var(--ink)"}>
          {item.deadline <= 3 ? "CLOSING SOON" : `${item.deadline}D LEFT`}
        </Stamp>
        <Barcode seed={item.ticketNo} height={26} />
        <div className="ticket-no mono">{item.ticketNo}</div>
        <div className="notch notch-bottom" />
      </div>
    </div>
  );
}

/* --------------------------------- SCREENS --------------------------------- */

function TopBar({ title, onBack, right }) {
  return (
    <div className="topbar">
      {onBack ? (
        <button className="icon-btn" onClick={onBack}><ChevronLeft size={20} /></button>
      ) : <div style={{ width: 32 }} />}
      <div className="topbar-title">{title}</div>
      <div style={{ width: 32, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

function LoginScreen({ role, onEnter }) {
  const isStudent = role === "student";
  return (
    <div className="screen login-screen">
      <div className="login-top">
        <div className="brand-mark"><Ticket size={26} color="var(--paper)" /></div>
        <div className="brand-name">InternNow</div>
        <div className="brand-tag mono">#SomethingIsBetterThanNothing</div>
      </div>
      <div className="login-card">
        <div className="login-role mono">{isStudent ? "STUDENT BOARDING PASS" : "COMPANY BOARDING PASS"}</div>
        <input className="input" placeholder={isStudent ? "you@college.edu" : "team@company.com"} defaultValue={isStudent ? "aria.f@bits.edu" : "hr@nimbuslabs.io"} readOnly />
        <input className="input" placeholder="Password" type="password" defaultValue="········" readOnly />
        <button className="btn-primary" onClick={onEnter}>
          {isStudent ? <GraduationCap size={16} /> : <Building2 size={16} />}
          Board as {isStudent ? "Student" : "Company"}
        </button>
        <div className="login-hint mono">No account yet? First ticket's free.</div>
      </div>
    </div>
  );
}

function StudentHome({ saved, onToggleSave, applications, onOpen }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Remote", "On-site", "Hybrid", "Paid"];
  const list = internshipsSeed.filter((i) => {
    const matchesQuery = (i.role + i.company).toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      filter === "All" ? true :
      filter === "Paid" ? i.tags.includes("Paid") :
      i.type === filter;
    return matchesQuery && matchesFilter;
  });
  return (
    <div className="screen">
      <TopBar title="InternNow" right={<Sparkles size={18} color="var(--highlight)" />} />
      <div className="content">
        <div className="hello mono">GATE OPEN · HI {STUDENT_NAME.split(" ")[0].toUpperCase()}</div>
        <div className="search-row">
          <Search size={16} color="var(--muted)" />
          <input className="search-input" placeholder="Search roles, companies…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <SlidersHorizontal size={16} color="var(--muted)" />
        </div>
        <div className="chip-row">
          {filters.map((f) => (
            <button key={f} className={"chip" + (filter === f ? " chip-active" : "")} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="ticket-list">
          {list.length === 0 && <div className="empty mono">No matches. Something is better than nothing — try another filter.</div>}
          {list.map((item) => (
            <TicketCard
              key={item.id}
              item={item}
              saved={saved.includes(item.id)}
              onToggleSave={onToggleSave}
              onOpen={onOpen}
              appliedStatus={applications[item.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InternshipDetail({ item, onBack, applied, onApply, saved, onToggleSave }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="screen">
      <TopBar title="Ticket details" onBack={onBack} right={
        <button className="icon-btn" onClick={() => onToggleSave(item.id)}>
          {saved ? <BookmarkCheck size={18} color="var(--stamp)" /> : <Bookmark size={18} />}
        </button>
      } />
      <div className="content">
        <div className="detail-header">
          <div className="logo logo-lg" style={{ background: item.color }}>{item.initial}</div>
          <div>
            <div className="role-title-lg">{item.role}</div>
            <div className="company-name">{item.company}</div>
          </div>
        </div>
        <div className="detail-grid mono">
          <div><span className="label">LOCATION</span>{item.location}</div>
          <div><span className="label">TYPE</span>{item.type}</div>
          <div><span className="label">DURATION</span>{item.duration}</div>
          <div><span className="label">STIPEND</span>{item.stipend}</div>
          <div><span className="label">DEADLINE</span>{item.deadline} days</div>
          <div><span className="label">TICKET NO</span>{item.ticketNo}</div>
        </div>
        <div className="ticket-tags" style={{ margin: "10px 0" }}>
          {item.tags.map((t) => <TagChip key={t}>{t}</TagChip>)}
        </div>
        <div className="section-label">ABOUT THE ROLE</div>
        <p className="desc">{item.desc}</p>
        <div className="section-label">YOUR MATCH</div>
        <div className="match-row">
          <MatchRing value={item.match} />
          <div className="match-copy">Based on your skills profile and past applications, you're a strong fit for this ticket.</div>
        </div>
        {!applied ? (
          <>
            <div className="section-label">APPLY</div>
            <button className="upload-box" onClick={() => setUploaded(true)}>
              <Upload size={16} />
              {uploaded ? "resume_aria_fernandes.pdf attached" : "Attach CV / resume"}
            </button>
            <button className="btn-primary btn-block" disabled={!uploaded} onClick={() => onApply(item.id)}>
              <Send size={16} /> Punch ticket & apply
            </button>
          </>
        ) : (
          <div className="applied-banner mono"><Check size={14} /> APPLIED · status: {applied}</div>
        )}
      </div>
    </div>
  );
}

function ApplicationsScreen({ applications, onOpenId }) {
  const statuses = ["Applied", "In Review", "Interview", "Offer", "Rejected"];
  const entries = Object.entries(applications);
  return (
    <div className="screen">
      <TopBar title="My applications" />
      <div className="content">
        {entries.length === 0 && <div className="empty mono">No tickets punched yet. Something is better than nothing — go apply.</div>}
        {statuses.map((s) => {
          const items = entries.filter(([, st]) => st === s);
          if (items.length === 0) return null;
          return (
            <div key={s} className="status-group">
              <div className="status-heading mono">
                <span className={"dot dot-" + s.replace(" ", "").toLowerCase()} /> {s.toUpperCase()} ({items.length})
              </div>
              {items.map(([id]) => {
                const item = internshipsSeed.find((i) => i.id === id);
                if (!item) return null;
                return (
                  <div className="mini-row" key={id} onClick={() => onOpenId(item)}>
                    <div className="logo" style={{ background: item.color }}>{item.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div className="mini-title">{item.role}</div>
                      <div className="mini-sub">{item.company}</div>
                    </div>
                    <div className="mini-match mono">{item.match}%</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessagesScreen({ onOpenChat }) {
  return (
    <div className="screen">
      <TopBar title="Messages" />
      <div className="content">
        {chatSeed.map((c) => (
          <div className="chat-row" key={c.id} onClick={() => onOpenChat(c)}>
            <div className="logo" style={{ background: c.color }}>{c.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="chat-name">{c.name}</div>
              <div className="chat-last">{c.last}</div>
            </div>
            <div className="chat-meta">
              <div className="chat-time mono">{c.time}</div>
              {c.unread > 0 && <div className="chat-badge">{c.unread}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen({ chat, onBack }) {
  const [messages, setMessages] = useState([
    { from: "them", text: "Thanks for applying! Your profile looks strong." },
    { from: "them", text: "Could you tell us about a project you're proud of?" },
    { from: "me", text: "Sure — I built a real-time dashboard for a campus club with 400+ weekly users." },
    { from: "them", text: "Great, can you share your GitHub too?" },
  ]);
  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMessages([...messages, { from: "me", text: draft }]);
    setDraft("");
  };
  return (
    <div className="screen">
      <TopBar title={chat.name} onBack={onBack} />
      <div className="content chat-content">
        <div className="chat-thread">
          {messages.map((m, i) => (
            <div key={i} className={"bubble " + (m.from === "me" ? "bubble-me" : "bubble-them")}>{m.text}</div>
          ))}
        </div>
      </div>
      <div className="chat-input-row">
        <input className="input" placeholder="Type a message…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button className="icon-btn icon-btn-primary" onClick={send}><Send size={16} /></button>
      </div>
    </div>
  );
}

function StudentProfile({ onLogout }) {
  const skills = ["React", "Figma", "SQL", "Python", "After Effects"];
  return (
    <div className="screen">
      <TopBar title="Profile" />
      <div className="content">
        <div className="profile-hero">
          <div className="logo logo-lg" style={{ background: "#2F6FED" }}>A</div>
          <div className="role-title-lg">{STUDENT_NAME}</div>
          <div className="company-name">BITS Pilani · CS, 3rd Year</div>
        </div>
        <div className="section-label">PROFILE COMPLETION</div>
        <div className="progress-track"><div className="progress-fill" style={{ width: "80%" }} /></div>
        <div className="mono muted small">80% — add a portfolio link to reach 100%</div>
        <div className="section-label">RESUME</div>
        <div className="upload-box"><Upload size={16} /> resume_aria_fernandes.pdf</div>
        <div className="section-label">SKILLS</div>
        <div className="ticket-tags">{skills.map((s) => <TagChip key={s}>{s}</TagChip>)}</div>
        <button className="btn-secondary btn-block" onClick={onLogout}><LogOut size={16} /> Switch account</button>
      </div>
    </div>
  );
}

/* ------------------------------ COMPANY SCREENS ----------------------------- */

function CompanyHome({ listings, onOpenListing, onNewPosting }) {
  return (
    <div className="screen">
      <TopBar title="Nimbus Labs" right={<Building2 size={18} color="var(--muted)" />} />
      <div className="content">
        <div className="hello mono">DEPARTURES BOARD</div>
        <button className="btn-primary btn-block" onClick={onNewPosting}><Plus size={16} /> Post new internship</button>
        <div className="ticket-list" style={{ marginTop: 14 }}>
          {listings.map((l) => (
            <div className="listing-row" key={l.id} onClick={() => onOpenListing(l)}>
              <div className="listing-top">
                <div className="role-title">{l.role}</div>
                <span className={"status-pill " + (l.status === "Open" ? "pill-open" : "pill-closed")}>{l.status}</span>
              </div>
              <div className="ticket-meta">
                <span><Briefcase size={12} /> {l.type}</span>
                <span><Clock3 size={12} /> {l.duration}</span>
                <span className="mono">{l.posted}</span>
              </div>
              <div className="applicant-strip">
                {l.applicants.slice(0, 4).map((a, i) => (
                  <div className="mini-avatar" key={i} style={{ background: a.color }}>{a.initial}</div>
                ))}
                <div className="mono small muted" style={{ marginLeft: 6 }}>{l.applicants.length} applicants</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewPostingForm({ onBack, onCreate }) {
  const [role, setRole] = useState("");
  const [type, setType] = useState("Remote");
  const [duration, setDuration] = useState("");
  return (
    <div className="screen">
      <TopBar title="New posting" onBack={onBack} />
      <div className="content">
        <div className="section-label">ROLE TITLE</div>
        <input className="input" placeholder="e.g. Frontend Engineering Intern" value={role} onChange={(e) => setRole(e.target.value)} />
        <div className="section-label">WORK TYPE</div>
        <div className="chip-row">
          {["Remote", "On-site", "Hybrid"].map((t) => (
            <button key={t} className={"chip" + (type === t ? " chip-active" : "")} onClick={() => setType(t)}>{t}</button>
          ))}
        </div>
        <div className="section-label">DURATION</div>
        <input className="input" placeholder="e.g. 3 months" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <div className="section-label">STIPEND</div>
        <input className="input" placeholder="e.g. ₹20,000/mo" />
        <div className="section-label">DESCRIPTION</div>
        <textarea className="input textarea" placeholder="What will they actually do here?" />
        <button
          className="btn-primary btn-block"
          disabled={!role || !duration}
          onClick={() => onCreate({ role, type, duration })}
        >
          <Ticket size={16} /> Print ticket & publish
        </button>
      </div>
    </div>
  );
}

function ApplicantsScreen({ listing, onBack, onUpdateStatus }) {
  return (
    <div className="screen">
      <TopBar title={listing.role} onBack={onBack} />
      <div className="content">
        <div className="hello mono">{listing.applicants.length} APPLICANTS</div>
        {listing.applicants.length === 0 && <div className="empty mono">No applicants yet. Something is better than nothing — share the listing.</div>}
        {listing.applicants.map((a, i) => (
          <div className="applicant-card" key={i}>
            <div className="ticket-top">
              <div className="logo" style={{ background: a.color }}>{a.initial}</div>
              <div style={{ flex: 1 }}>
                <div className="mini-title">{a.name}</div>
                <div className="mini-sub">{a.school}</div>
              </div>
              <MatchRing value={a.match} />
            </div>
            <div className="applicant-actions">
              <button className="icon-btn icon-btn-bad" onClick={() => onUpdateStatus(listing.id, i, "Rejected")}><ThumbsDown size={16} /></button>
              <div className={"status-pill status-pill-mid " + (a.status === "Shortlisted" ? "pill-open" : a.status === "Interview" ? "pill-interview" : a.status === "Rejected" ? "pill-closed" : "")}>{a.status}</div>
              <button className="icon-btn icon-btn-good" onClick={() => onUpdateStatus(listing.id, i, "Shortlisted")}><ThumbsUp size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyProfile({ onLogout }) {
  return (
    <div className="screen">
      <TopBar title="Company profile" />
      <div className="content">
        <div className="profile-hero">
          <div className="logo logo-lg" style={{ background: "#2F6FED" }}>N</div>
          <div className="role-title-lg">{COMPANY_NAME}</div>
          <div className="company-name">Cloud infrastructure · 40–200 employees</div>
        </div>
        <div className="section-label">ACTIVE LISTINGS</div>
        <div className="mono">2 open · 1 closed</div>
        <div className="section-label">RESPONSE TIME</div>
        <div className="mono">Usually replies within 2 days</div>
        <button className="btn-secondary btn-block" onClick={onLogout}><LogOut size={16} /> Switch account</button>
      </div>
    </div>
  );
}

/* --------------------------------- BOTTOM NAV -------------------------------- */

function BottomNav({ role, active, onChange }) {
  const studentTabs = [
    { key: "home", label: "Board", icon: Home },
    { key: "applications", label: "Tickets", icon: ClipboardList },
    { key: "messages", label: "Chat", icon: MessageCircle },
    { key: "profile", label: "You", icon: User },
  ];
  const companyTabs = [
    { key: "home", label: "Postings", icon: Home },
    { key: "messages", label: "Chat", icon: MessageCircle },
    { key: "profile", label: "Company", icon: User },
  ];
  const tabs = role === "student" ? studentTabs : companyTabs;
  return (
    <div className="bottomnav">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.key;
        return (
          <button key={t.key} className={"navbtn" + (isActive ? " navbtn-active" : "")} onClick={() => onChange(t.key)}>
            <Icon size={18} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------------- APP ----------------------------------- */

export default function InternNowApp() {
  const [role, setRole] = useState("student");
  const [authed, setAuthed] = useState({ student: false, company: false });
  const [tab, setTab] = useState("home");
  const [detailItem, setDetailItem] = useState(null);
  const [saved, setSaved] = useState(["in-5"]);
  const [applications, setApplications] = useState({ "in-2": "In Review", "in-4": "Interview" });
  const [activeChat, setActiveChat] = useState(null);
  const [listings, setListings] = useState(companyListingsSeed);
  const [activeListing, setActiveListing] = useState(null);
  const [posting, setPosting] = useState(false);

  const toggleSave = (id) => setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const apply = (id) => { setApplications((a) => ({ ...a, [id]: "Applied" })); setDetailItem(null); };

  const switchRole = (r) => {
    setRole(r);
    setTab("home");
    setDetailItem(null);
    setActiveChat(null);
    setActiveListing(null);
    setPosting(false);
  };

  const logout = () => setAuthed((a) => ({ ...a, [role]: false }));

  const updateApplicantStatus = (listingId, idx, status) => {
    setListings((prev) => prev.map((l) => {
      if (l.id !== listingId) return l;
      const applicants = l.applicants.map((a, i) => i === idx ? { ...a, status } : a);
      return { ...l, applicants };
    }));
    setActiveListing((prev) => {
      if (!prev || prev.id !== listingId) return prev;
      const applicants = prev.applicants.map((a, i) => i === idx ? { ...a, status } : a);
      return { ...prev, applicants };
    });
  };

  const createListing = ({ role: r, type, duration }) => {
    const newListing = { id: "cl-" + Date.now(), role: r, type, duration, posted: "Just now", status: "Open", applicants: [] };
    setListings((prev) => [newListing, ...prev]);
    setPosting(false);
  };

  let body;
  if (!authed[role]) {
    body = <LoginScreen role={role} onEnter={() => setAuthed((a) => ({ ...a, [role]: true }))} />;
  } else if (activeChat) {
    body = <ChatScreen chat={activeChat} onBack={() => setActiveChat(null)} />;
  } else if (role === "student") {
    if (detailItem) {
      body = (
        <InternshipDetail
          item={detailItem}
          onBack={() => setDetailItem(null)}
          applied={applications[detailItem.id]}
          onApply={apply}
          saved={saved.includes(detailItem.id)}
          onToggleSave={toggleSave}
        />
      );
    } else if (tab === "home") {
      body = <StudentHome saved={saved} onToggleSave={toggleSave} applications={applications} onOpen={setDetailItem} />;
    } else if (tab === "applications") {
      body = <ApplicationsScreen applications={applications} onOpenId={setDetailItem} />;
    } else if (tab === "messages") {
      body = <MessagesScreen onOpenChat={setActiveChat} />;
    } else {
      body = <StudentProfile onLogout={logout} />;
    }
  } else {
    if (posting) {
      body = <NewPostingForm onBack={() => setPosting(false)} onCreate={createListing} />;
    } else if (activeListing) {
      const live = listings.find((l) => l.id === activeListing.id) || activeListing;
      body = <ApplicantsScreen listing={live} onBack={() => setActiveListing(null)} onUpdateStatus={updateApplicantStatus} />;
    } else if (tab === "home") {
      body = <CompanyHome listings={listings} onOpenListing={setActiveListing} onNewPosting={() => setPosting(true)} />;
    } else if (tab === "messages") {
      body = <MessagesScreen onOpenChat={setActiveChat} />;
    } else {
      body = <CompanyProfile onLogout={logout} />;
    }
  }

  return (
    <div className="app-outer">
      <style>{CSS}</style>
      <div className="role-switcher">
        <span className="mono small muted">PREVIEW AS</span>
        <div className="switch-track">
          <button className={"switch-btn" + (role === "student" ? " switch-btn-active" : "")} onClick={() => switchRole("student")}>
            <GraduationCap size={14} /> Student
          </button>
          <button className={"switch-btn" + (role === "company" ? " switch-btn-active" : "")} onClick={() => switchRole("company")}>
            <Building2 size={14} /> Company
          </button>
        </div>
      </div>

      <div className="phone">
        <div className="notch-speaker" />
        <div className="phone-screen">
          {body}
        </div>
        {authed[role] && !detailItem && !activeChat && !activeListing && !posting && (
          <BottomNav role={role} active={tab} onChange={setTab} />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- STYLES ---------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root{
  --ink:#16192B;
  --paper:#F6F3EC;
  --paper2:#EFEAdc;
  --card:#FFFFFF;
  --stamp:#E1432B;
  --highlight:#F4B740;
  --ok:#2F7A4D;
  --line:#DCD6C4;
  --muted:#8A8570;
}

.app-outer{
  display:flex; flex-direction:column; align-items:center; gap:16px;
  font-family:'Inter',sans-serif; color:var(--ink);
  padding:24px 10px 40px; background:
    radial-gradient(circle at 1px 1px, #00000012 1px, transparent 1px) 0 0/16px 16px,
    #EAE6D9;
  min-height:820px;
}

.mono{ font-family:'IBM Plex Mono', monospace; }
.small{ font-size:11px; }
.muted{ color:var(--muted); }

.role-switcher{ display:flex; align-items:center; gap:10px; }
.switch-track{ display:flex; background:var(--ink); border-radius:999px; padding:3px; }
.switch-btn{ display:flex; align-items:center; gap:6px; border:none; background:transparent; color:#B9B7AE; font-family:'Inter',sans-serif; font-weight:600; font-size:12.5px; padding:7px 14px; border-radius:999px; cursor:pointer; }
.switch-btn-active{ background:var(--stamp); color:#fff; }

.phone{
  width:390px; background:var(--ink); border-radius:46px; padding:14px;
  box-shadow:0 30px 60px -20px rgba(0,0,0,0.45), 0 0 0 8px #0000000d;
  position:relative;
}
.notch-speaker{ width:70px; height:6px; background:#000; border-radius:6px; margin:0 auto 10px; opacity:0.6; }
.phone-screen{
  background:var(--paper); border-radius:30px; height:730px; overflow:hidden;
  display:flex; flex-direction:column; position:relative;
}

.screen{ display:flex; flex-direction:column; height:100%; }
.content{ padding:14px 16px 90px; overflow-y:auto; flex:1; }
.content::-webkit-scrollbar{ display:none; }

.topbar{ display:flex; align-items:center; justify-content:space-between; padding:16px 14px 10px; }
.topbar-title{ font-family:'Big Shoulders Display', sans-serif; font-weight:800; font-size:20px; letter-spacing:0.3px; }
.icon-btn{ width:32px; height:32px; border-radius:10px; border:1px solid var(--line); background:var(--card); display:flex; align-items:center; justify-content:center; cursor:pointer; }
.icon-btn-primary{ background:var(--ink); border-color:var(--ink); color:#fff; }
.icon-btn-good{ border-color:var(--ok); color:var(--ok); }
.icon-btn-bad{ border-color:var(--stamp); color:var(--stamp); }

/* Login */
.login-screen{ justify-content:flex-start; padding-top:30px; }
.login-top{ text-align:center; margin-bottom:26px; }
.brand-mark{ width:56px; height:56px; border-radius:16px; background:var(--ink); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; transform:rotate(-4deg); }
.brand-name{ font-family:'Big Shoulders Display',sans-serif; font-weight:800; font-size:32px; }
.brand-tag{ font-size:11px; color:var(--stamp); margin-top:4px; }
.login-card{ margin:0 20px; background:var(--card); border:1px solid var(--line); border-radius:18px; padding:20px; display:flex; flex-direction:column; gap:10px; }
.login-role{ font-size:11px; color:var(--muted); letter-spacing:1px; margin-bottom:4px; }
.login-hint{ text-align:center; font-size:11px; color:var(--muted); margin-top:4px; }

.input{ border:1px solid var(--line); background:#FBFAF6; border-radius:10px; padding:11px 12px; font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink); }
.input:focus{ outline:2px solid var(--ink); }
.textarea{ min-height:80px; resize:none; margin-bottom:14px; }

.btn-primary{ display:flex; align-items:center; justify-content:center; gap:8px; background:var(--stamp); color:#fff; border:none; border-radius:12px; padding:13px; font-weight:700; font-size:14px; cursor:pointer; font-family:'Inter',sans-serif; }
.btn-primary:disabled{ background:#D8D2C0; color:#8A8570; cursor:not-allowed; }
.btn-block{ width:100%; margin-top:6px; }
.btn-secondary{ display:flex; align-items:center; justify-content:center; gap:8px; background:transparent; color:var(--ink); border:1.5px solid var(--ink); border-radius:12px; padding:12px; font-weight:600; font-size:13.5px; cursor:pointer; margin-top:22px; }

.hello{ font-size:11px; color:var(--stamp); letter-spacing:1px; margin-bottom:10px; }
.search-row{ display:flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:10px 12px; margin-bottom:10px; }
.search-input{ flex:1; border:none; background:transparent; font-family:'Inter',sans-serif; font-size:13.5px; outline:none; }
.chip-row{ display:flex; gap:8px; overflow-x:auto; padding-bottom:10px; }
.chip{ border:1px solid var(--line); background:var(--card); border-radius:999px; padding:6px 13px; font-size:12px; font-weight:600; white-space:nowrap; cursor:pointer; color:var(--ink); }
.chip-active{ background:var(--ink); color:#fff; border-color:var(--ink); }

/* Ticket card */
.ticket-list{ display:flex; flex-direction:column; gap:14px; }
.ticket{ display:flex; background:var(--card); border-radius:16px; border:1px solid var(--line); overflow:hidden; cursor:pointer; box-shadow:0 6px 14px -10px rgba(0,0,0,0.3); }
.ticket-main{ flex:1; padding:14px; min-width:0; }
.ticket-top{ display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.logo{ width:36px; height:36px; border-radius:9px; color:#fff; display:flex; align-items:center; justify-content:center; font-family:'Big Shoulders Display',sans-serif; font-weight:800; font-size:16px; flex-shrink:0; }
.logo-lg{ width:52px; height:52px; border-radius:14px; font-size:22px; }
.role-title{ font-weight:700; font-size:14px; line-height:1.25; }
.role-title-lg{ font-family:'Big Shoulders Display',sans-serif; font-weight:800; font-size:22px; }
.company-name{ font-size:12px; color:var(--muted); }
.ticket-meta{ display:flex; flex-wrap:wrap; gap:10px; font-size:11px; color:var(--muted); margin-bottom:8px; align-items:center; }
.ticket-meta span{ display:flex; align-items:center; gap:4px; }
.ticket-tags{ display:flex; flex-wrap:wrap; gap:6px; }
.tag{ background:var(--paper2); border:1px solid var(--line); border-radius:6px; padding:3px 8px; font-size:10.5px; font-weight:600; color:var(--ink); }
.applied-row{ margin-top:8px; display:flex; align-items:center; gap:5px; font-size:11px; color:var(--ok); font-weight:600; }

.ticket-stub{ width:104px; background:var(--paper2); border-left:2px dashed var(--line); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:12px 8px; position:relative; }
.stub-label{ font-size:9px; color:var(--muted); letter-spacing:1px; }
.ticket-no{ font-size:9.5px; color:var(--muted); }
.notch{ position:absolute; width:16px; height:16px; background:var(--paper); border-radius:50%; left:-9px; }
.notch-top{ top:-9px; }
.notch-bottom{ bottom:-9px; }

.stamp{ border:2px solid var(--stamp); border-radius:5px; padding:3px 7px; font-family:'IBM Plex Mono',monospace; font-size:9px; font-weight:700; letter-spacing:0.5px; transform:rotate(-7deg); text-align:center; }

/* Detail */
.detail-header{ display:flex; align-items:center; gap:12px; margin-bottom:16px; }
.detail-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 14px; font-size:12px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px; }
.detail-grid .label{ display:block; font-size:9px; color:var(--muted); letter-spacing:0.6px; margin-bottom:2px; }
.section-label{ font-size:11px; letter-spacing:1px; color:var(--muted); margin:16px 0 8px; font-weight:700; }
.desc{ font-size:13px; line-height:1.55; color:#3A3A32; }
.match-row{ display:flex; align-items:center; gap:12px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px; }
.match-copy{ font-size:12px; color:var(--muted); line-height:1.4; }
.upload-box{ width:100%; display:flex; align-items:center; gap:8px; border:1.5px dashed var(--line); border-radius:12px; padding:13px; background:var(--card); font-size:13px; cursor:pointer; color:var(--ink); font-family:'Inter',sans-serif; margin-bottom:10px; }
.applied-banner{ margin-top:14px; background:#E7F1EA; color:var(--ok); border:1px solid var(--ok); border-radius:10px; padding:11px; display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; }

/* Applications */
.status-group{ margin-bottom:18px; }
.status-heading{ font-size:11px; letter-spacing:0.8px; color:var(--muted); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.dot{ width:8px; height:8px; border-radius:50%; background:var(--muted); }
.dot-applied{ background:#5B7FE0; }
.dot-inreview{ background:var(--highlight); }
.dot-interview{ background:#8A4FE0; }
.dot-offer{ background:var(--ok); }
.dot-rejected{ background:var(--stamp); }
.mini-row{ display:flex; align-items:center; gap:10px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:10px; margin-bottom:8px; cursor:pointer; }
.mini-title{ font-weight:700; font-size:13px; }
.mini-sub{ font-size:11px; color:var(--muted); }
.mini-match{ font-size:12px; font-weight:700; }
.empty{ text-align:center; color:var(--muted); font-size:12px; padding:40px 10px; }

/* Messages / chat */
.chat-row{ display:flex; align-items:center; gap:10px; padding:11px 4px; border-bottom:1px solid var(--line); cursor:pointer; }
.chat-name{ font-weight:700; font-size:13.5px; }
.chat-last{ font-size:12px; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.chat-meta{ display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.chat-time{ font-size:10px; color:var(--muted); }
.chat-badge{ background:var(--stamp); color:#fff; font-size:10px; font-weight:700; border-radius:999px; padding:1px 6px; }
.chat-content{ display:flex; flex-direction:column; justify-content:flex-end; padding-bottom:10px; }
.chat-thread{ display:flex; flex-direction:column; gap:8px; }
.bubble{ max-width:78%; padding:9px 12px; border-radius:14px; font-size:13px; line-height:1.4; }
.bubble-them{ background:var(--card); border:1px solid var(--line); align-self:flex-start; border-bottom-left-radius:4px; }
.bubble-me{ background:var(--ink); color:#fff; align-self:flex-end; border-bottom-right-radius:4px; }
.chat-input-row{ display:flex; gap:8px; padding:10px 14px 18px; border-top:1px solid var(--line); background:var(--paper); }

/* Profile */
.profile-hero{ display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center; margin-bottom:6px; padding:10px 0 16px; }
.progress-track{ height:8px; background:var(--line); border-radius:6px; overflow:hidden; }
.progress-fill{ height:100%; background:var(--stamp); }

/* Company */
.listing-row{ background:var(--card); border:1px solid var(--line); border-radius:14px; padding:13px; cursor:pointer; }
.listing-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.status-pill{ font-size:10px; font-weight:700; padding:3px 9px; border-radius:999px; }
.pill-open{ background:#E7F1EA; color:var(--ok); }
.pill-closed{ background:#F0E9E4; color:var(--muted); }
.pill-interview{ background:#EFE6FA; color:#8A4FE0; }
.applicant-strip{ display:flex; align-items:center; margin-top:8px; }
.mini-avatar{ width:22px; height:22px; border-radius:50%; color:#fff; font-size:9px; font-weight:800; display:flex; align-items:center; justify-content:center; margin-left:-6px; border:2px solid var(--card); font-family:'Big Shoulders Display',sans-serif; }
.mini-avatar:first-child{ margin-left:0; }

.applicant-card{ background:var(--card); border:1px solid var(--line); border-radius:14px; padding:12px; margin-bottom:10px; }
.applicant-actions{ display:flex; align-items:center; gap:10px; margin-top:10px; justify-content:center; }
.status-pill-mid{ flex:1; text-align:center; background:var(--paper2); color:var(--ink); }

/* Bottom nav */
.bottomnav{ position:absolute; bottom:0; left:0; right:0; background:var(--card); border-top:1px solid var(--line); display:flex; padding:8px 6px 14px; border-radius:0 0 30px 30px; }
.navbtn{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; background:transparent; border:none; color:var(--muted); font-size:10px; font-weight:600; padding:6px 0; cursor:pointer; font-family:'Inter',sans-serif; }
.navbtn-active{ color:var(--stamp); }
`;
