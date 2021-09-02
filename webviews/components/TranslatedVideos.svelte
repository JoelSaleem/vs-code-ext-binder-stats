<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";
  import ShowBtn from "./ShowBtn.svelte";

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

  let show = false;
  const toggleShow = () => (show = !show);
</script>

<div>
  <h2>TranslatedVideos</h2>

  <ShowBtn 
    onClick={toggleShow}
    isShowing={show}
    resource="translated videos"
  />

  {#if show}
  <div>
    {#if translatedVideos.length > 0} {#each translatedVideos as {id, title,
    stateValue, createdAt}, i}
    <div>{i + 1}: {id} - {title}</div>
    <div>{stateValue}</div>
    <div style="padding-bottom: 12px">{new Date(createdAt)}</div>
    {/each} {:else}
    <p>No stuck translatedVideos</p>
    {/if}
  </div>
  {/if}
</div>
