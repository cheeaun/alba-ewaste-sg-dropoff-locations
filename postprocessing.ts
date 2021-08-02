import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const data = await readJSON(filename);

const geojsonFilename = filename.replace(/\.txt$/, '.geojson');
const geoJSONData = {
  type: 'FeatureCollection',
  features: data.data.map((d: any) => {
    const { longitude, latitude, ...properties } = d;
    return {
      type: 'Feature',
      properties,
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };
  }),
};

await writeJSON(geojsonFilename, geoJSONData);