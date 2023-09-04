import { BigInt } from "@graphprotocol/graph-ts";
import { UserClaim } from "../../types/mine/schema";
import { Claim } from "../../types/mine/templates/ERC20Mine/ERC20Mine";

export function handleClaim(event: Claim): void {
  let id = event.params.user
    .toHexString()
    .concat("-")
    .concat(event.address.toHexString());
  let userClaim = UserClaim.load(id);
  if (userClaim == null) {
    userClaim = new UserClaim(id);
    userClaim.user = event.params.user;
    userClaim.pool = event.address;
    userClaim.amount = BigInt.fromI32(0);
  }
  userClaim.amount = userClaim.amount.plus(event.params.reward);
  userClaim.updatedAt = event.block.timestamp;
  userClaim.save();
}
