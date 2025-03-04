import { stat } from "fs";

/**
 * Interfaces to strongly type the data returned by the Strava API.
 */
interface StravaActivity {
  id: number;
  average_speed: number;
  distance: number; // in meters
  total_elevation_gain: number; // in meters
  gear_id?: string | null;
  // Add other fields from the API response as needed.
}

interface StravaGearDetail {
  gearId: string;
  brand_name: string;
  model_name: string;
  distance: number;
}

interface ActivityStats {
  averageDistance: number; // in kilometers
  averageElevationGain: number;
  averageSpeed: number; // miles/h
  uniqueGearIds: string[];
}

export interface StravaActivitiesResult {
  averageDistance: number;
  averageElevationGain: number;
  averageSpeed: number,
  gearDetails: StravaGearDetail[];
}

/**
 * Helper function to get the authorization headers for the Strava API.
 * Throws an error if STRAVA_ACCESS_TOKEN is not set.
 */
function getAuthHeaders(): HeadersInit {
  const accessToken = process.env.STRAVA_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("STRAVA_ACCESS_TOKEN is not set");
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

/**
 * Calls the Strava API and fetches raw activities.
 * @returns A promise that resolves with an array of StravaActivity objects.
 */
async function fetchRawStravaActivities(): Promise<StravaActivity[]> {
  const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch activities: ${response.statusText}`);
  }

  const activities: StravaActivity[] = await response.json();
  return activities;
}

/**
 * Computes statistics from an array of StravaActivity objects.
 *
 * - averageDistance is calculated in kilometers.
 * - averageElevationGain is computed from the total elevation gains.
 * - uniqueGearIds collects the unique gear IDs from the activities.
 *
 * @param activities - Array of StravaActivity objects.
 * @returns Computed statistics.
 */
function computeActivityStats(activities: StravaActivity[]): ActivityStats {
  if (activities.length === 0) {
    return {
      averageSpeed: 0,
      averageDistance: 0,
      averageElevationGain: 0,
      uniqueGearIds: [],
    };
  }

  let totalDistance = 0;
  let totalElevationGain = 0;
  let averageSpeed = 0;
  const athleteId = String
  const gearIdSet = new Set<string>();

  for (const activity of activities) {
    totalDistance += activity.distance ?? 0;
    totalElevationGain += activity.total_elevation_gain ?? 0;
    averageSpeed += activity.average_speed ?? 0;
    if (activity.gear_id) {
      gearIdSet.add(activity.gear_id);
    }
  }

  return {
    averageSpeed: averageSpeed * 3.6 / activities.length,
    averageDistance: totalDistance / activities.length / 1000, // convert meters to kilometers
    averageElevationGain: totalElevationGain / activities.length,
    uniqueGearIds: Array.from(gearIdSet),
  };
}

/**
 * Fetches detailed gear information for a given gear ID.
 * @param gearId - The gear ID to fetch details for.
 * @returns A promise that resolves with a StravaGearDetail object.
 */
async function fetchGearDetails(gearId: string): Promise<StravaGearDetail> {
  const url = `https://www.strava.com/api/v3/gear/${gearId}`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch gear details for ${gearId}: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    gearId,
    brand_name: data.brand_name,
    model_name: data.model_name,
    distance: data.distance,
  };
}

/**
 * Fetches Strava activities and returns computed statistics along with gear details.
 *
 * The returned object contains:
 *  - averageDistance: The average activity distance (in kilometers).
 *  - averageElevationGain: The average elevation gain.
 *  - gearDetails: Detailed information for each unique gear ID.
 *
 * @returns A promise that resolves with StravaActivitiesResult.
 */
export async function fetchStravaActivities(): Promise<StravaActivitiesResult> {
  const activities = await fetchRawStravaActivities();
  const stats = computeActivityStats(activities);
  // Fetch gear details in parallel for all unique gear IDs.
  const gearDetails = await Promise.all(
    stats.uniqueGearIds.map((gearId) => fetchGearDetails(gearId))
  );

  return {
    averageSpeed: stats.averageSpeed,
    averageDistance: stats.averageDistance,
    averageElevationGain: stats.averageElevationGain,
    gearDetails,
  };
}
