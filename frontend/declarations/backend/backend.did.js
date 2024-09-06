export const idlFactory = ({ IDL }) => {
  const GemStone = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'rating' : IDL.Opt(IDL.Nat),
    'image' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : GemStone, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addGemStone' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getGemStone' : IDL.Func([IDL.Nat], [Result_1], ['query']),
    'getGemStones' : IDL.Func([], [IDL.Vec(GemStone)], ['query']),
    'rateGemStone' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
