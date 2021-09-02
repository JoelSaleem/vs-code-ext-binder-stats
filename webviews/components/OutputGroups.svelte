<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";
  import ShowBtn from "./ShowBtn.svelte";

  const oneHourAgoEpoch = Date.now() - 1000 * 60 * 60;
  const oneHourAgoStr = new Date(oneHourAgoEpoch).toISOString();

  const thirtyDaysAgoEpoch = Date.now() - 1000 * 60 * 60 * 24 * 30;
  const thirtyDaysAgoStr = new Date(thirtyDaysAgoEpoch).toISOString();

  const STUCK_OUTPUT_GROUPS = gql`
      {
        outputGroups(
          where: {
            stateValue_not: Complete
            updatedAt_lt: "${oneHourAgoStr}"
            createdAt_gt: "${thirtyDaysAgoStr}"
          }
        ) {
          id
          translatedVideo {
              latestOutputGroup {
                  id
              }
            title
          }
          stateValue
          createdAt
        }
      }
    `;

  let outputGroups = [];

  const ogQuery = query(STUCK_OUTPUT_GROUPS);

  ogQuery
    .result()
    .then((d) => {
      outputGroups = d.data.outputGroups
        .map(
          ({
            id,
            stateValue,
            createdAt,
            translatedVideo: {
              title,
              latestOutputGroup: { id: latestOutputGroupId },
            },
          }) => ({ id, stateValue, title, createdAt, latestOutputGroupId })
        )
        .filter(({ id, latestOutputGroupId }) => id == latestOutputGroupId);
    })
    .catch((e) => {
      console.log(e);
    });

  let show = false;
  const toggleShow = () => (show = !show);
</script>

<div>
  <h2>Output Groups</h2>

  <ShowBtn 
    onClick={toggleShow}
    isShowing={show}
    resource="outputGroups"
  />

  {#if show} {#if outputGroups.length > 0}
  <div>
    {#each outputGroups as { id, stateValue, title, createdAt}, i}
    <div>{i + 1}: {id} - {title}</div>
    <div>{stateValue}</div>
    <div style="padding-bottom: 12px">{new Date(createdAt)}</div>
    {/each}
  </div>
  {:else}
  <p>No stuck ogs</p>
  {/if} {/if}
</div>
