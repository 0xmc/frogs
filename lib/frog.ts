const INAT_OBSERVATIONS_URL = "https://api.inaturalist.org/v1/observations";
const PER_PAGE = 30;
// iNaturalist disallows deep offset pagination (page * per_page > 10000),
// so we pick a random page within that ceiling to get variety.
const MAX_PAGE = Math.floor(10000 / PER_PAGE);

export type Frog = {
  id: string;
  imageUrl: string;
  title: string;
  permalink: string;
};

type INatPhoto = {
  id: number;
  url: string;
};

type INatObservation = {
  id: number;
  uri: string;
  species_guess: string | null;
  photos: INatPhoto[];
  taxon: { name: string; preferred_common_name?: string } | null;
};

type INatResponse = {
  results: INatObservation[];
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function toFrog(observation: INatObservation): Frog | null {
  const photo = observation.photos[0];
  if (!photo) return null;

  const title =
    observation.species_guess ??
    observation.taxon?.preferred_common_name ??
    observation.taxon?.name ??
    "a frog";

  return {
    id: String(observation.id),
    imageUrl: photo.url.replace("/square.", "/medium."),
    title,
    permalink: observation.uri,
  };
}

async function fetchObservationPage(page: number): Promise<Frog[]> {
  const url = new URL(INAT_OBSERVATIONS_URL);
  url.searchParams.set("taxon_name", "Anura");
  url.searchParams.set("photos", "true");
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));
  url.searchParams.set("order", "desc");
  url.searchParams.set("order_by", "id");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`iNaturalist fetch failed: ${res.status}`);
  }

  const data: INatResponse = await res.json();
  return data.results.map(toFrog).filter((frog): frog is Frog => frog !== null);
}

/**
 * Grabs a random page of frog observation photos from iNaturalist.
 * Called repeatedly (with different random pages) by the caller until
 * a frog not already dismissed turns up.
 */
export async function fetchRandomFrogCandidates(): Promise<Frog[]> {
  const page = 1 + Math.floor(Math.random() * MAX_PAGE);
  const candidates = await fetchObservationPage(page);
  return shuffle(candidates);
}
