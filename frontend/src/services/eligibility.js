import api from "./api";

export async function checkEligibility(profile) {
  const { data } = await api.post("/api/eligibility/", profile);
  return data; // { eligible_schemes, total_matched }
}

export async function listSchemes(params = {}) {
  const { data } = await api.get("/api/schemes/", { params });
  return data;
}

export async function getSchemeDetail(schemeId) {
  const { data } = await api.get(`/api/schemes/${schemeId}`);
  return data;
}

export async function compareSchemes(schemeIdA, schemeIdB) {
  const { data } = await api.post("/api/compare/", {
    scheme_id_a: schemeIdA,
    scheme_id_b: schemeIdB,
  });
  return data; // { comparison }
}

export async function addBookmark(schemeId) {
  const { data } = await api.post(`/api/bookmarks/${schemeId}`);
  return data;
}

export async function listBookmarks() {
  const { data } = await api.get("/api/bookmarks/");
  return data;
}
