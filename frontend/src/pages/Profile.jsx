import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getUser, updateProfile } from "../services/api";

function Profile() {
  const stored = JSON.parse(localStorage.getItem("user"));
  const [form,    setForm]    = useState({
    name: "", email: "", phone: "", dob: "", address: "", department: "", bio: "",
  });
  const [editing,  setEditing]  = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);

  useEffect(() => {
    getUser(stored.id)
      .then(res => {
        const u = res.data.user;
        setForm({
          name:       u.name       || "",
          email:      u.email      || "",
          phone:      u.phone      || "",
          dob:        u.dob        || "",
          address:    u.address    || "",
          department: u.department || "",
          bio:        u.bio        || "",
        });
      })
      .catch(() => {
        setForm({
          name:       stored.name  || "",
          email:      stored.email || "",
          phone: "", dob: "", address: "", department: "", bio: "",
        });
      })
      .finally(() => setLoading(false));
  }, [stored.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const roleInfo = {
    student: { label: "Student", badge: "badge-sky" },
    faculty: { label: "Faculty", badge: "badge-emerald" },
    admin:   { label: "Admin",   badge: "badge-violet" },
  };
  const info = roleInfo[stored?.role] || roleInfo.student;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProfile(stored.id, form);
      const updated = res.data.user;
      localStorage.setItem("user", JSON.stringify({ ...stored, name: updated.name, email: updated.email }));
      setForm({
        name:       updated.name       || "",
        email:      updated.email      || "",
        phone:      updated.phone      || "",
        dob:        updated.dob        || "",
        address:    updated.address    || "",
        department: updated.department || "",
        bio:        updated.bio        || "",
      });
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: "Full Name",           name: "name",       type: "text"  },
    { label: "Email Address",       name: "email",      type: "email" },
    { label: "Phone Number",        name: "phone",      type: "text"  },
    { label: "Date of Birth",       name: "dob",        type: "date"  },
    { label: "Department / Program",name: "department", type: "text"  },
  ];

  if (loading) return (
    <Layout>
      <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(148,163,184,0.4)" }}>Loading profile...</div>
    </Layout>
  );

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Profile</h1>
        <p className="page-sub">Your personal information</p>
      </div>

      {success && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "10px 16px", marginBottom: 20, fontSize: "0.8125rem", color: "#34d399" }}>
          ✅ Profile updated successfully!
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, alignItems: "start" }}>
        {/* Avatar card */}
        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div className="avatar" style={{ width: 80, height: 80, fontSize: "2rem", marginBottom: 14, boxShadow: "0 0 0 4px rgba(99,102,241,0.2), 0 8px 24px rgba(99,102,241,0.2)" }}>
            {form.name?.[0]?.toUpperCase() || "?"}
          </div>
          <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>{form.name}</p>
          <p style={{ color: "rgba(148,163,184,0.45)", fontSize: "0.8rem", marginTop: 4 }}>{form.email}</p>
          <span className={`badge ${info.badge}`} style={{ marginTop: 10 }}>{info.label}</span>

          <div style={{ width: "100%", marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
            {[
              { k: "Role",       v: stored?.role?.charAt(0).toUpperCase() + stored?.role?.slice(1) },
              { k: "Phone",      v: form.phone      || "—" },
              { k: "Department", v: form.department || "—" },
              { k: "DOB",        v: form.dob        || "—" },
            ].map(e => (
              <div key={e.k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.4)" }}>{e.k}</span>
                <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>{e.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit form */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <p className="section-title">Personal Information</p>
            {!editing
              ? <button onClick={() => setEditing(true)} className="btn-primary" style={{ padding: "6px 14px" }}>Edit Profile</button>
              : <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: "6px 14px", opacity: saving ? 0.6 : 1 }}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setEditing(false)} className="btn-secondary" style={{ padding: "6px 14px" }}>Cancel</button>
                </div>
            }
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {fields.map(f => (
              <div key={f.name}>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>{f.label}</label>
                {editing
                  ? <input className="input-field" type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} />
                  : <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: "0.875rem", color: "#e2e8f0" }}>{form[f.name] || "—"}</div>
                }
              </div>
            ))}

            <div style={{ gridColumn: "1 / -1" }}>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Address</label>
              {editing
                ? <input className="input-field" type="text" name="address" value={form.address} onChange={handleChange} />
                : <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: "0.875rem", color: "#e2e8f0" }}>{form.address || "—"}</div>
              }
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Bio</label>
              {editing
                ? <textarea className="input-field" name="bio" value={form.bio} onChange={handleChange} rows={3} style={{ resize: "none" }} />
                : <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: "0.875rem", color: "#e2e8f0", lineHeight: 1.6 }}>{form.bio || "—"}</div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
