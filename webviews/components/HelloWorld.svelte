<Test />

<script lang="ts">
  console.log('hi there')

  import Test from "./Test.svelte";
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

<!-- <h1>Hello world 3 asdf</h1> -->