function solution(participant, completion) {
  participant.sort();
  completion.sort();
  var answer = "";

  var CompleteHash = {};

  // 중복되는지 검사
  for (var c in completion) {
    var name = completion[c];
    CompleteHash[name] === undefined ? (CompleteHash[name] = 1) : (CompleteHash[name] += 1);
  }

  // 참가한 걸 확인하면 1 씩 뺀다
  for (var p in participant) {
    var p_name = participant[p];
    CompleteHash[p_name] === undefined ? (answer = p_name) : (CompleteHash[p_name] -= 1);
  }

  // -1 인 선수가 완주하지 못한 선수
  for (var _p in participant) {
    var _name = participant[_p];
    CompleteHash[_name] === -1 ? (answer = _name) : null;
  }
  return answer;
}
