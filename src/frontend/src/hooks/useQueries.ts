import { useQuery } from "@tanstack/react-query";
import type { ChannelInfo } from "../backend.d";
import { useActor } from "./useActor";

const FALLBACK_CHANNEL_INFO: ChannelInfo = {
  channelName: "new.raistarbhai",
  channelUrl: "https://youtube.com/@new.raistarbhai?feature=shared",
  bio: "Welcome to new.raistarbhai! We create engaging, entertaining, and informative videos for our amazing community. From trending topics to in-depth tutorials, there's something for everyone. Join thousands of viewers and be part of our growing family!",
};

export function useChannelInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ChannelInfo>({
    queryKey: ["channelInfo"],
    queryFn: async () => {
      if (!actor) return FALLBACK_CHANNEL_INFO;
      try {
        const info = await actor.getChannelInfo();
        return info;
      } catch {
        return FALLBACK_CHANNEL_INFO;
      }
    },
    enabled: !isFetching,
    placeholderData: FALLBACK_CHANNEL_INFO,
  });
}
