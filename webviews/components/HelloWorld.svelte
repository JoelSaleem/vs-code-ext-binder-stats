<Users />
<TranslatedVideos />
<OutputGroups />

<script lang="ts">
  import Users from "./Users.svelte";
  import TranslatedVideos from "./TranslatedVideos.svelte";
  import OutputGroups from "./OutputGroups.svelte";
  
  import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
  import { setClient, query } from "svelte-apollo";

  const client = new ApolloClient({
    uri: "https://binder-prod.papercup.com",
    cache: new InMemoryCache(),
    headers: {
      // TODO: API KEY
      "x-api-key": ``,
    },
  });


  setClient(client);
</script>