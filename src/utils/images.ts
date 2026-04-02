export type MemberKey = 'BTS' | 'Jimin' | 'Jin' | 'Jung Kook' | 'RM' | 'SUGA' | 'V' | 'j-hope';

const memberImages: Record<MemberKey, string[]> = {
  BTS: [
    '05bb264a-12a0-4fed-b578-a9274fd8a952.png',
    '70eed79e-97dc-44ed-afd2-ef4f3cd82183.jpeg',
    'babc2a90-626e-4fa6-ad7d-679cf75a286e.jpg',
    'c7a69bf0-ac98-42a6-b8d9-0af28e853671.jpg',
    'ef6b6f55-e065-44d9-afe9-9bbc04c14733.jpeg',
  ],
  Jimin: [
    '1dda56e3-a67a-4699-8e62-695190ba9c93.jpg',
    '45bbfca0-5b0f-47e5-b8d9-d746f6c6a8a2.png',
    '59233eda-1339-4d08-a80b-065ebc4d2454.jpg',
    '7ea895b3-368a-46cc-ac99-aca43eb2c677.jpg',
    'c475c553-5f8d-4d77-be35-389df019c83f.jpeg',
  ],
  Jin: [
    '59616fbf-ad56-4a00-bf97-1e8c9136e9b7.jpg',
    '69299459-7f1a-4b1d-918f-d31c3d23daec.webp',
    '886fc5e5-e47a-4371-af2c-867cdccb7e08.jpg',
    'cd7102b9-30f3-4000-93b7-371707b9efee.jpeg',
    'f97e4076-86e7-4893-8560-1b86332624fb.jpg',
  ],
  'Jung Kook': [
    '25e2cf2a-7647-4891-a895-a6f739164d38.jpeg',
    'ae451adb-72d6-4723-8604-1f8ee4bb2043.jpeg',
    'bad5b94d-02ed-4db6-a7fe-c4b945352fad.jpg',
    'ee661b60-a1f5-4eaa-95be-43322a5bf827.jpg',
    'efd881e9-3d94-48ff-9cdc-227b119865db.png',
  ],
  RM: [
    '58e9904f-52c8-4232-bc4d-8fee61ee15fe.jpeg',
    '5c8d01f8-5a70-47d2-9d90-3e7f5fc7769a.webp',
    '7b33c443-6df7-4c4f-ba51-9f95d543c61e.jpg',
    '8f6bd287-ba99-4c8b-ab15-b2297a49fd55.jpg',
    'acd5f34c-5a71-4201-acab-36ab9a542913.webp',
  ],
  SUGA: [
    '0cdf6e58-d3ee-488d-ae77-3c2e9f62c5cd.jpg',
    '975bf1bc-665d-437e-a38e-ce5f841e5122.jpeg',
    '9d695973-a034-4a46-9f57-57ebd1a2a3c6.jpeg',
    'cb920763-7615-43e1-934b-3024145d3794.jpeg',
    'f66477ba-c48a-42fc-9b2f-db003e93f4a2.jpg',
  ],
  V: [
    '1bf0e8a3-ad56-4564-839e-db3266addf61.jpg',
    '49c3f970-cc5e-4d0b-927b-099714cc13c3.jpg',
    '7a59683f-d175-4740-a91b-e92040bef770.webp',
    '8d1318d2-33f3-4c87-87c4-b9f31a6ca494.png',
    'ef144439-59fc-474c-a746-92260768e00a.jpg',
  ],
  'j-hope': [
    '2f202a9f-2845-4894-b253-fde7294ffa1f.jpg',
    '4843bce8-b4c3-4160-b248-c4bc871f6404.webp',
    '6237bb8f-4ceb-49f2-b8ee-5b151fde8171.jpg',
    '90906200-a014-4a41-9e58-ee99ee73146b.webp',
    'f76171a7-8b42-4656-a9ea-90253c2a9b31.jpg',
  ],
};

export function getRandomImage(member: MemberKey): string {
  const images = memberImages[member];
  const file = images[Math.floor(Math.random() * images.length)];
  const folder = encodeURIComponent(member);
  return `/images/${folder}/${file}`;
}
