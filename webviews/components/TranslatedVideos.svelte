<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";

  const oneHourAgoEpoch = Date.now() - 1000 * 60 * 60;
  const oneHourAgoStr = new Date(oneHourAgoEpoch).toISOString();

  const thirtyDaysAgoEpoch = Date.now() - 1000 * 60 * 60 * 24 * 30;
  const thirtyDaysAgoStr = new Date(thirtyDaysAgoEpoch).toISOString();

  const STUCK_TRANSLATED_VIDEOS = gql`
      {
        translatedVideos(
          where: {
            stateValue_not_in: [
              ReadyToQA
              InProgressQA
              OutputGenerated
              Complete
              ReadyForPublish
            ]
            updatedAt_lt: "${oneHourAgoStr}"
            createdAt_gt: "${thirtyDaysAgoStr}"
          }
        ) {
          id
          title
          stateValue
          createdAt
        }
      }
    `;

  let translatedVideos = [];

  const tvQuery = query(STUCK_TRANSLATED_VIDEOS);

  tvQuery
    .result()
    .then((d) => {
      translatedVideos = d.data.translatedVideos.map(
        ({ id, title, createdAt, stateValue }) => ({
          id,
          title,
          createdAt,
          stateValue,
        })
      );
    })
    .catch((e) => {
      console.log(e);
    });
</script>

<div>
  tv

  <div>
    {#each translatedVideos as {id, title, stateValue, createdAt}, i}
    <div>{i + 1}: {id} - {title}</div>
    <div>{stateValue}</div>
    <div style="padding-bottom: 12px">{new Date(createdAt)}</div>
    {/each}
  </div>
</div>
