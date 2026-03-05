import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type ChannelInfo = {
    channelName : Text;
    channelUrl : Text;
    bio : Text;
  };

  let channelInfo : ChannelInfo = {
    channelName = "new.raistarbhai";
    channelUrl = "https://youtube.com/@new.raistarbhai";
    bio = "Welcome to the official new.raistarbhai YouTube channel!";
  };

  public query ({ caller }) func getChannelInfo() : async ChannelInfo {
    channelInfo;
  };

  public query ({ caller }) func getChannelName() : async Text {
    channelInfo.channelName;
  };

  public query ({ caller }) func getChannelUrl() : async Text {
    channelInfo.channelUrl;
  };

  public query ({ caller }) func getBio() : async Text {
    channelInfo.bio;
  };
};
