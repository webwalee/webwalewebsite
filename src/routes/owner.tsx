import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Lock, 
  User, 
  KeyRound, 
  ShieldCheck, 
  Star,
  LogOut, 
  Phone, 
  MessageCircle, 
  RefreshCw, 
  Download, 
  Search, 
  Trash2, 
  Calendar, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { getLeads, deleteLead, type LeadRecord } from "@/lib/server-leads";
import { phoneNumber } from "@/lib/portfolio";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [{ title: "Owner Portal · WEBWALE Studio" }],
  }),
  component: OwnerPortalPage,
});

export function OwnerPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Tab & Reviews state
  const [activeTab, setActiveTab] = useState<"leads" | "reviews">("leads");
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [reviewSearchTerm, setReviewSearchTerm] = useState("");

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("ww_owner_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        loadLeads("webwale", "Sharry@678");
      }
    }
  }, []);

  async function loadLeads(u: string, p: string) {
    setRefreshing(true);
    try {
      const res = await fetch("/api/leads").then((r) => r.json());
      if (res && res.ok && Array.isArray(res.leads) && res.leads.length > 0) {
        setLeads(res.leads);
      }
    } catch (e) {
      console.warn("Backend API fetch notice:", e);
    }

    // Fallback to localStorage leads
    try {
      const local = JSON.parse(localStorage.getItem("webwale_leads") || "[]");
      if (Array.isArray(local) && local.length > 0) {
        setLeads((prev) => (prev.length > 0 ? prev : local));
      }
    } catch {}

    // Also load reviews
    await loadReviews();
    setRefreshing(false);
  }

  async function loadReviews() {
    try {
      const res = await fetch("/api/reviews").then((r) => r.json());
      if (res && res.ok && Array.isArray(res.reviews)) {
        setUserReviews(res.reviews);
        return;
      }
    } catch {}

    try {
      const local = JSON.parse(localStorage.getItem("webwale_user_reviews") || "[]");
      if (Array.isArray(local)) {
        setUserReviews(local);
      }
    } catch {}
  }

  async function handleDeleteReview(id: string) {
    if (!confirm("Are you sure you want to remove this client review?")) return;
    try {
      await fetch("/api/delete-review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {}

    const updated = userReviews.filter((r) => r.id !== id);
    setUserReviews(updated);
    try {
      localStorage.setItem("webwale_user_reviews", JSON.stringify(updated));
    } catch {}
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    if (username.trim() === "webwale" && password === "Sharry@678") {
      setLoading(true);
      setTimeout(() => {
        sessionStorage.setItem("ww_owner_auth", "true");
        setIsAuthenticated(true);
        setLoading(false);
        loadLeads("webwale", "Sharry@678");
      }, 400);
    } else {
      setLoginError("Invalid username or password. Sirf authorized owner hi access kar sakte hain.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("ww_owner_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await fetch("/api/delete-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {}

    // Update state and localStorage
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem("webwale_leads", JSON.stringify(updated));
    } catch {}
  }

  function handleExportCSV() {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }
    const headers = ["Ticket ID", "Date & Time", "Client Name", "Phone", "Business", "Requirement", "Budget", "Details"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.business}"`,
      `"${l.requirement}"`,
      `"${l.budget}"`,
      `"${(l.details || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `webwale-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredLeads = leads.filter((l) => {
    const q = searchTerm.toLowerCase();
    return (
      l.name?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.business?.toLowerCase().includes(q) ||
      l.requirement?.toLowerCase().includes(q) ||
      l.id?.toLowerCase().includes(q)
    );
  });

  const filteredUserReviews = userReviews.filter((r) => {
    const q = reviewSearchTerm.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.company?.toLowerCase().includes(q) ||
      r.city?.toLowerCase().includes(q) ||
      r.quote?.toLowerCase().includes(q) ||
      r.highlightMetric?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q)
    );
  });

  // Login View
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#070a12] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#0f172a] border border-amber-500/30 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-1">
              SECURE ACCESS CONTROL
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-montserrat">
              WEBWALE <span className="text-amber-400 italic font-serif">Owner Portal</span>
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Sign in with your confidential credentials to view and manage client enquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Login to Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Dashboard View
  return (
    <main className="min-h-screen bg-[#070a12] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navbar */}
        <header className="flex flex-wrap items-center justify-between gap-4 bg-[#0f172a] border border-slate-800 rounded-2xl p-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">WEBWALE Owner Portal</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-slate-400">Direct lead control for +91 7707930377</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 transition-colors inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
            <div className="text-xs uppercase font-mono text-slate-400 mb-1">Total Enquiries</div>
            <div className="text-3xl font-extrabold text-white">{leads.length}</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Stored in Backend & Local
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
            <div className="text-xs uppercase font-mono text-slate-400 mb-1">WhatsApp Forwarding</div>
            <div className="text-xl font-bold text-amber-400 font-mono">+91 7707930377</div>
            <div className="text-xs text-slate-400 mt-2">Active Official Destination</div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
            <div className="text-xs uppercase font-mono text-slate-400 mb-1">Quick Actions</div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => loadLeads("webwale", "Sharry@678")}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs py-2 rounded-xl text-slate-200 inline-flex items-center justify-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs py-2 rounded-xl text-amber-300 inline-flex items-center justify-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "leads"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-[#0f172a] border border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Client Enquiries ({leads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "reviews"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-[#0f172a] border border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Client Reviews ({userReviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Leads & Enquiries */}
        {activeTab === "leads" && (
          <section className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Client Submissions</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-normal">
                    {filteredLeads.length} leads
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every client who fills the form on the website appears here immediately.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-700 focus:border-amber-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No enquiries found.</p>
                <p className="text-xs text-slate-600 mt-1">
                  Client jaise hi website par form bharega, yahan unki puri detail aa jayegi.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <article
                    key={lead.id}
                    className="bg-[#070a12] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                          {lead.id}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {lead.timestamp}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(lead.id)}
                        className="text-slate-500 hover:text-red-400 p-1 text-xs transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Client Name</span>
                        <span className="font-semibold text-white text-sm">{lead.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Phone</span>
                        <span className="font-mono font-semibold text-slate-200">{lead.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Business</span>
                        <span className="font-medium text-slate-300">{lead.business}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Service & Budget</span>
                        <span className="font-medium text-amber-300">
                          {lead.requirement} · {lead.budget}
                        </span>
                      </div>
                    </div>

                    {lead.details && (
                      <div className="bg-[#0f172a] rounded-lg p-2.5 text-xs text-slate-300 border border-slate-800">
                        <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">Project Vision / Note</span>
                        <p>{lead.details}</p>
                      </div>
                    )}

                    {/* Actions for Owner */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Call Client</span>
                      </a>

                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(lead.name)},%20I%20am%20from%20WEBWALE%20Studio%20regarding%20your%20website%20enquiry.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Client Submitted Reviews */}
        {activeTab === "reviews" && (
          <section className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Client Submitted Reviews</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-normal">
                    {filteredUserReviews.length} reviews
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Reviews written by clients through the "Write a Review" option appear here for your moderation.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reviews by name, company, city..."
                  value={reviewSearchTerm}
                  onChange={(e) => setReviewSearchTerm(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-700 focus:border-amber-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {filteredUserReviews.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30 text-amber-400" />
                <p>No client reviews submitted yet.</p>
                <p className="text-xs text-slate-600 mt-1">
                  Jab koi client website ke "Write a Review" button se review fill karega, yahan unka review show hoga.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUserReviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="bg-[#070a12] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">
                          {rev.rating}.0 / 5.0
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          · {rev.timestamp || rev.date}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteReview(rev.id)}
                        className="text-slate-500 hover:text-red-400 p-1 text-xs transition-colors flex items-center gap-1"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Client</span>
                        <span className="font-semibold text-white text-sm">{rev.name}</span>
                        <span className="text-[11px] text-slate-400 block">{rev.role}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Company / Business</span>
                        <span className="font-medium text-slate-200">{rev.company}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">City & Category</span>
                        <span className="font-medium text-slate-300">{rev.city} · {rev.category}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Highlight Metric</span>
                        <span className="font-medium text-amber-300">{rev.highlightMetric}</span>
                      </div>
                    </div>

                    <div className="bg-[#0f172a] rounded-lg p-3 text-xs text-slate-200 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Review Feedback:</span>
                      <p className="italic">"{rev.quote}"</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
