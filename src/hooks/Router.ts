
const useRouter = {
   go: (path: string) => {
      history.pushState({ path }, "", path)
      dispatchEvent(new PopStateEvent("popstate", { state: { path } }))
   },
   reload: () => {
      dispatchEvent(new PopStateEvent("popstate", { state: { path: location.pathname } }))
   },
   back: () => history.back(),
   forward: () => history.forward(),
}

export default useRouter