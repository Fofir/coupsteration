# NOTES

1. I used the ID field for id based on my semantic logic, however I have a feeling you wanted me to use the VIN field there.
2. When I saw it is taking me too long to figure out the correct setup for the interval setting of the `<App />` component, I have just commented out these tests using `xit` to be pending and remember for later.
3. I started implementing the table/map view but did not have the time to get to it. Since the `<App />` component includes already some of the API and it will be a future feature, I left the relevant code in.
4. I used a combination of snapshot testing and enzyme based component testing. My logic dictates that functional components can be tested using snapshots and component with some interaction and local state should be tested more thoroughly (Like in the `<Select />` component.
5. I used minimal styling with Bootstrap (my go-to for prototyping). I included it via their CDN although I usually use include in in as a dependency in my projects. It was just faster to do it like that for now.
