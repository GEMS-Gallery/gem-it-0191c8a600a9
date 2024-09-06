import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor GemStoneGallery {
  type GemStone = {
    id: Nat;
    name: Text;
    description: Text;
    image: Text;
    rating: ?Nat;
  };

  stable var nextGemId: Nat = 0;
  let gemStones = HashMap.HashMap<Nat, GemStone>(10, Nat.equal, Nat.hash);

  public query func getGemStones() : async [GemStone] {
    Iter.toArray(gemStones.vals())
  };

  public query func getGemStone(id: Nat) : async Result.Result<GemStone, Text> {
    switch (gemStones.get(id)) {
      case (null) { #err("Gem stone not found") };
      case (?gemStone) { #ok(gemStone) };
    }
  };

  public func addGemStone(name: Text, description: Text, image: Text) : async Nat {
    let id = nextGemId;
    let newGemStone: GemStone = {
      id;
      name;
      description;
      image;
      rating = null;
    };
    gemStones.put(id, newGemStone);
    nextGemId += 1;
    id
  };

  public func rateGemStone(id: Nat, rating: Nat) : async Result.Result<(), Text> {
    if (rating < 1 or rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    switch (gemStones.get(id)) {
      case (null) { #err("Gem stone not found") };
      case (?gemStone) {
        let updatedGemStone = {
          id = gemStone.id;
          name = gemStone.name;
          description = gemStone.description;
          image = gemStone.image;
          rating = ?rating;
        };
        gemStones.put(id, updatedGemStone);
        #ok()
      };
    }
  };

  system func preupgrade() {
    // No need to implement as we're using a stable variable for nextGemId
    // and HashMap is already stable
  };

  system func postupgrade() {
    // No need to implement as we're using a stable variable for nextGemId
    // and HashMap is already stable
  };
}
