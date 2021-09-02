<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";
  import ShowBtn from "./ShowBtn.svelte"

  const halfAnHourAgoEpoch = Date.now() - 1000 * 60 * 30;
  const halfAnHourAgoStr = new Date(halfAnHourAgoEpoch).toISOString();

  const USERS_ONLINE = gql`
    {
      sessions(where: { updatedAt_gt: "${halfAnHourAgoStr}" }) {
        id
        updatedAt

        userId {
          email
        }
      }
    }
  `;

  let users = [];

  const usersQuery = query(USERS_ONLINE);

  usersQuery
    .result()
    .then((d) => {
      users = d.data.sessions.map(({ id, updatedAt, userId: { email } }) => ({
        id,
        email,
        updatedAt,
      }));
    })
    .catch((e) => {
      console.log(e);
    });

  let show = false;

  const toggleShow = () => (show = !show);
</script>

<style>
  .item-wrapper {
    padding: 12px 0px;
  }
</style>

<div>
  <h2>Users</h2>

  <ShowBtn 
  resource="users"
    isShowing={show}
    onClick={toggleShow}
  />

  {#if show}
  <div>
    {#if users.length > 0} {#each users as {id, email, updatedAt}, i}
    <div class="item-wrapper">
      {i + 1}:
      <div>id: {id}</div>
      <div>email: {email}</div>
      <div>last session: {new Date(updatedAt)}</div>
    </div>
    {/each} {:else}
    <p>No users online</p>
    {/if}
  </div>
  {/if}
</div>
