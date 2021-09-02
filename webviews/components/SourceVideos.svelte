<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";
  import ShowBtn from "./ShowBtn.svelte";

  const oneHourAgoEpoch = Date.now() - 1000 * 60 * 60;
  const oneHourAgoStr = new Date(oneHourAgoEpoch).toISOString();

  const thirtyDaysAgoEpoch = Date.now() - 1000 * 60 * 60 * 24 * 30;
  const thirtyDaysAgoStr = new Date(thirtyDaysAgoEpoch).toISOString();

  const STUCK_SOURCE_VIDS = gql`
    {
      sourceVideos(
        where: {
          stateValue_not: Complete
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

  let sourceVideos = [];

  const svQuery = query(STUCK_SOURCE_VIDS);

  svQuery
    .result()
    .then((d) => {
      sourceVideos = d.data.sourceVideos.map(
        ({ id, stateValue, title, createdAt }) => ({
          id,
          stateValue,
          title,
          createdAt,
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
  <h2>Source Videos</h2>

  <ShowBtn 
    onClick={toggleShow}
    isShowing={show}
    resource="source videos"
  />

  {#if show}
  {#if sourceVideos.length > 0}
  <div>
    {#each sourceVideos as { id, stateValue, title, createdAt}, i}
    <div>{i + 1}: {id} - {title}</div>
    <div>{stateValue}</div>
    <div style="padding-bottom: 12px">{new Date(createdAt)}</div>
    {/each}
  </div>
  {:else}
  <p>No stuck svs</p>
  {/if}
  {/if}
</div>
