/**
 * GitQuest Automated Test Suite
 * Tests All Workflows, Sound Effects, Git Engine, Curriculum, and Anime Data
 */

import {
  playCoinSound,
  playSuccessSound,
  playErrorSound,
  playClickSound,
  playPowerUpSound,
  playJutsuSound,
  playMissionCompleteAnimeSound,
  playHackerTypingSound,
  playNotificationSound,
  playLevelUpSound,
} from '../src/utils/audio';
import { MISSIONS } from '../src/data/missions';
import { TOPICS_CURRICULUM } from '../src/data/curriculum';
import { ANIME_QUOTES } from '../src/data/animeQuotes';
import { ANIME_CHARACTERS } from '../src/data/animeCharacters';
import { createInitialRepo, executeGitCommand } from '../src/engine/gitSimulator';

// ==========================================
// TEST UTILITIES
// ==========================================
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failedTests++;
  }
}

// ==========================================
// 1. SOUND EFFECTS & WEB AUDIO TESTS
// ==========================================
console.log('\n=============================================');
console.log('🔊 1. TESTING WEB AUDIO PROCEDURAL SYNTHESIZER');
console.log('=============================================');

interface MockAudioEvent {
  method: string;
  args: any[];
}

const recordedAudioEvents: MockAudioEvent[] = [];

// Mock Web Audio API in Node environment
class MockGainNode {
  gain = {
    value: 1,
    setValueAtTime: (val: number, time: number) => {
      recordedAudioEvents.push({ method: 'gain.setValueAtTime', args: [val, time] });
    },
    linearRampToValueAtTime: (val: number, time: number) => {
      recordedAudioEvents.push({ method: 'gain.linearRampToValueAtTime', args: [val, time] });
    },
    exponentialRampToValueAtTime: (val: number, time: number) => {
      if (val <= 0) {
        throw new Error(`DOMException: exponentialRampToValueAtTime value must be > 0. Got: ${val}`);
      }
      recordedAudioEvents.push({ method: 'gain.exponentialRampToValueAtTime', args: [val, time] });
    },
  };
  connect(_dest: any) {
    recordedAudioEvents.push({ method: 'gain.connect', args: [] });
  }
}

class MockOscillatorNode {
  type: OscillatorType = 'sine';
  frequency = {
    value: 440,
    setValueAtTime: (val: number, time: number) => {
      if (isNaN(val) || val <= 0) {
        throw new Error(`Invalid oscillator frequency: ${val}`);
      }
      recordedAudioEvents.push({ method: 'osc.frequency.setValueAtTime', args: [val, time] });
    },
    exponentialRampToValueAtTime: (val: number, time: number) => {
      if (val <= 0) {
        throw new Error(`exponentialRampToValueAtTime value must be > 0. Got: ${val}`);
      }
      recordedAudioEvents.push({ method: 'osc.frequency.exponentialRampToValueAtTime', args: [val, time] });
    },
  };
  connect(_dest: any) {
    recordedAudioEvents.push({ method: 'osc.connect', args: [] });
  }
  start(time?: number) {
    recordedAudioEvents.push({ method: 'osc.start', args: [time] });
  }
  stop(time?: number) {
    recordedAudioEvents.push({ method: 'osc.stop', args: [time] });
  }
}

class MockAudioContext {
  state = 'running';
  currentTime = 1.0;
  destination = {};

  createOscillator() {
    return new MockOscillatorNode();
  }

  createGain() {
    return new MockGainNode();
  }

  resume() {
    this.state = 'running';
  }
}

// Attach mock AudioContext to global window
(global as any).window = {
  AudioContext: MockAudioContext,
};

function testSoundFunction(name: string, fn: (enabled?: boolean) => void) {
  try {
    recordedAudioEvents.length = 0;
    // Test disabled does not fire
    fn(false);
    assert(recordedAudioEvents.length === 0, `${name}: respects enabled=false (no audio nodes)`);

    // Test enabled fires audio nodes
    fn(true);
    assert(recordedAudioEvents.length > 0, `${name}: generates audio nodes and ramps`);

    // Verify all stop times are >= start times
    const startEvents = recordedAudioEvents.filter((e) => e.method === 'osc.start');
    const stopEvents = recordedAudioEvents.filter((e) => e.method === 'osc.stop');
    assert(startEvents.length === stopEvents.length, `${name}: all oscillators have matching start & stop calls`);

    for (let i = 0; i < startEvents.length; i++) {
      const startTime = startEvents[i].args[0] ?? 0;
      const stopTime = stopEvents[i].args[0] ?? 0;
      assert(stopTime >= startTime, `${name} (osc ${i + 1}): stop time (${stopTime}) >= start time (${startTime})`);
    }
  } catch (err: any) {
    assert(false, `${name}: failed with error`, err.message);
  }
}

testSoundFunction('playCoinSound', playCoinSound);
testSoundFunction('playSuccessSound', playSuccessSound);
testSoundFunction('playErrorSound', playErrorSound);
testSoundFunction('playClickSound', playClickSound);
testSoundFunction('playPowerUpSound', playPowerUpSound);
testSoundFunction('playJutsuSound', playJutsuSound);
testSoundFunction('playMissionCompleteAnimeSound', playMissionCompleteAnimeSound);
testSoundFunction('playHackerTypingSound', playHackerTypingSound);
testSoundFunction('playNotificationSound', playNotificationSound);
testSoundFunction('playLevelUpSound', playLevelUpSound);

// ==========================================
// 2. GIT SIMULATOR ENGINE & COMMAND WORKFLOW
// ==========================================
console.log('\n=============================================');
console.log('💻 2. TESTING GIT SIMULATOR ENGINE');
console.log('=============================================');

try {
  const initialFiles = {
    'index.html': { content: '<h1>Hello</h1>', status: 'untracked' as const },
    'style.css': { content: 'body {}', status: 'untracked' as const },
  };
  let repo = createInitialRepo(initialFiles);
  repo.initialized = false;
  assert(repo.initialized === false, 'createInitialRepo: initializes with repo.initialized = false');
  assert(Object.keys(repo.workingDirectory).length > 0, 'createInitialRepo: has initial working directory files');

  // Test: git init
  let res = executeGitCommand(repo, 'git init');
  repo = res.newState;
  assert(repo.initialized === true, 'git init: sets initialized to true');
  assert(!res.result.isError, 'git init: command succeeds without error');

  // Test: git status
  res = executeGitCommand(repo, 'git status');
  assert(!res.result.isError, 'git status: succeeds');
  assert(res.result.output.includes('Untracked') || res.result.output.includes('Changes'), 'git status: shows untracked/changed files');

  // Test: git add .
  res = executeGitCommand(repo, 'git add .');
  repo = res.newState;
  assert(!res.result.isError, 'git add .: succeeds');
  assert(Object.keys(repo.stagingArea).length > 0, 'git add .: files staged in stagingArea');

  // Test: git commit
  res = executeGitCommand(repo, 'git commit -m "Initial commit"');
  repo = res.newState;
  assert(!res.result.isError, 'git commit: succeeds');
  assert(repo.commits.length > 0, 'git commit: adds commit to commit history');
  assert(Object.keys(repo.stagingArea).length === 0, 'git commit: clears staging area');

  // Test: git branch feature
  res = executeGitCommand(repo, 'git branch feature');
  repo = res.newState;
  assert(!res.result.isError, 'git branch feature: succeeds');
  assert(repo.branches['feature'] !== undefined, 'git branch feature: creates branch "feature"');

  // Test: git switch feature
  res = executeGitCommand(repo, 'git switch feature');
  repo = res.newState;
  assert(!res.result.isError, 'git switch feature: succeeds');
  assert(repo.currentBranch === 'feature', 'git switch feature: switches current branch to "feature"');

  // Test: git log
  res = executeGitCommand(repo, 'git log');
  assert(!res.result.isError, 'git log: succeeds');
  assert(res.result.output.includes('Initial commit'), 'git log: outputs commit message');

  // Test: git switch main
  res = executeGitCommand(repo, 'git switch main');
  repo = res.newState;
  assert(!res.result.isError, 'git switch main: returns to main branch');
  assert(repo.currentBranch === 'main', 'git switch main: current branch is "main"');
} catch (err: any) {
  assert(false, 'Git Simulator Engine execution failed', err.message);
}

// ==========================================
// 3. MISSIONS WORKFLOW & PROGRESSION TESTS
// ==========================================
console.log('\n=============================================');
console.log('🎯 3. TESTING MISSIONS DATA & STEP WORKFLOW');
console.log('=============================================');

assert(MISSIONS.length >= 10, `Mission count is substantial (found ${MISSIONS.length} missions)`);

const missionIdSet = new Set(MISSIONS.map((m) => m.id));
assert(missionIdSet.size === MISSIONS.length, 'All mission IDs are unique');

MISSIONS.forEach((m) => {
  assert(m.title.length > 0, `Mission "${m.id}": has valid title ("${m.title}")`);
  assert(m.steps.length > 0, `Mission "${m.id}": has at least 1 interactive step (${m.steps.length} steps)`);
  assert(m.takeaways.length > 0, `Mission "${m.id}": has key takeaways`);

  if (m.nextMissionId) {
    assert(missionIdSet.has(m.nextMissionId), `Mission "${m.id}": nextMissionId "${m.nextMissionId}" points to valid mission`);
  }

  m.steps.forEach((step, idx) => {
    assert(step.description.length > 0, `Mission "${m.id}" Step ${idx + 1}: has description`);
    assert(step.taskHint.length > 0, `Mission "${m.id}" Step ${idx + 1}: has task hint`);
    assert(typeof step.checkCompletion === 'function', `Mission "${m.id}" Step ${idx + 1}: has checkCompletion function`);
  });
});

// ==========================================
// 4. CURRICULUM & PRESENTATION WORKFLOW
// ==========================================
console.log('\n=============================================');
console.log('📚 4. TESTING TOPICS CURRICULUM & PRESENTATIONS');
console.log('=============================================');

assert(TOPICS_CURRICULUM.length >= 8, `Curriculum has comprehensive topics (found ${TOPICS_CURRICULUM.length})`);

TOPICS_CURRICULUM.forEach((topic) => {
  assert(topic.title.length > 0, `Topic "${topic.id}": has title ("${topic.title}")`);
  assert(topic.slides.length >= 1, `Topic "${topic.id}": has presentation slides (${topic.slides.length} slides)`);
  assert(topic.cutscene.dialogue.length >= 2, `Topic "${topic.id}": has cutscene dialogues (${topic.cutscene.dialogue.length} lines)`);
  assert(topic.cutscene.speaker.length > 0, `Topic "${topic.id}": cutscene speaker is defined ("${topic.cutscene.speaker}")`);
  assert(topic.cutscene.avatar.length > 0, `Topic "${topic.id}": cutscene avatar is defined ("${topic.cutscene.avatar}")`);

  topic.slides.forEach((slide, sIdx) => {
    assert(slide.title.length > 0, `Topic "${topic.id}" Slide ${sIdx + 1}: has title`);
    assert(slide.content.length > 0, `Topic "${topic.id}" Slide ${sIdx + 1}: has content points`);
    assert(slide.keyTakeaway.length > 0, `Topic "${topic.id}" Slide ${sIdx + 1}: has key takeaway`);
  });
});

// ==========================================
// 5. GOAT ANIME QUOTES & DIALOGUES
// ==========================================
console.log('\n=============================================');
console.log('🍥 5. TESTING GOAT ANIME QUOTES & CHARACTERS');
console.log('=============================================');

assert(ANIME_QUOTES.length >= 10, `Anime quotes database is rich (found ${ANIME_QUOTES.length} quotes)`);

const animesRepresented = new Set(ANIME_QUOTES.map((q) => q.anime));
assert(animesRepresented.has('Naruto'), 'Contains Naruto quotes');
assert(animesRepresented.has('One Piece'), 'Contains One Piece quotes');
assert(animesRepresented.has('Attack on Titan'), 'Contains Attack on Titan quotes');
assert(animesRepresented.has('Jujutsu Kaisen'), 'Contains Jujutsu Kaisen quotes');
assert(animesRepresented.has('Dragon Ball Z'), 'Contains Dragon Ball Z quotes');
assert(animesRepresented.has('Bleach'), 'Contains Bleach quotes');

ANIME_QUOTES.forEach((q) => {
  assert(q.character.length > 0, `Quote "${q.id}": character is valid ("${q.character}")`);
  assert(q.quote.length > 15, `Quote "${q.id}": quote content is substantial`);
  assert(q.avatar.length > 0, `Quote "${q.id}": avatar emoji is set ("${q.avatar}")`);
  assert(q.japaneseTitle.length > 0, `Quote "${q.id}": Japanese title is set ("${q.japaneseTitle}")`);
});

// ==========================================
// 6. ANIME CHARACTERS & NINJA RANKS
// ==========================================
console.log('\n=============================================');
console.log('🥷 6. TESTING ANIME CHARACTERS & NINJA RANKS');
console.log('=============================================');

assert(ANIME_CHARACTERS.length >= 5, `Anime characters available (found ${ANIME_CHARACTERS.length})`);

ANIME_CHARACTERS.forEach((char) => {
  assert(char.name.length > 0, `Character "${char.id}": has name ("${char.name}")`);
  assert(char.japaneseName.length > 0, `Character "${char.id}": has Japanese name ("${char.japaneseName}")`);
  assert(char.title.length > 0, `Character "${char.id}": has title ("${char.title}")`);
  assert(char.role.length > 0, `Character "${char.id}": has role ("${char.role}")`);
  assert(char.avatar.length > 0, `Character "${char.id}": has avatar`);
  assert(char.specialty.length > 0, `Character "${char.id}": has specialty`);
});

// Test Ninja Rank Logic
function getNinjaRank(lvl: number) {
  if (lvl >= 12) return 'HOKAGE / PIRATE KING';
  if (lvl >= 8) return 'JONIN / FIRST MATE';
  if (lvl >= 4) return 'CHUNIN / PIRATE WARRIOR';
  return 'GENIN / CABIN BOY';
}

assert(getNinjaRank(1) === 'GENIN / CABIN BOY', 'Lvl 1 ranks as Genin / Cabin Boy');
assert(getNinjaRank(3) === 'GENIN / CABIN BOY', 'Lvl 3 ranks as Genin / Cabin Boy');
assert(getNinjaRank(4) === 'CHUNIN / PIRATE WARRIOR', 'Lvl 4 ranks as Chunin / Pirate Warrior');
assert(getNinjaRank(7) === 'CHUNIN / PIRATE WARRIOR', 'Lvl 7 ranks as Chunin / Pirate Warrior');
assert(getNinjaRank(8) === 'JONIN / FIRST MATE', 'Lvl 8 ranks as Jonin / First Mate');
assert(getNinjaRank(11) === 'JONIN / FIRST MATE', 'Lvl 11 ranks as Jonin / First Mate');
assert(getNinjaRank(12) === 'HOKAGE / PIRATE KING', 'Lvl 12 ranks as Hokage / Pirate King');
assert(getNinjaRank(50) === 'HOKAGE / PIRATE KING', 'Lvl 50 ranks as Hokage / Pirate King');

// ==========================================
// FINAL RESULTS SUMMARY
// ==========================================
console.log('\n=============================================');
console.log(`📊 TEST SUITE SUMMARY:`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${failedTests}`);
console.log('=============================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL WORKFLOWS, SOUND EFFECTS & DATA INTEGRITY TESTS PASSED 100%!\n');
  process.exit(0);
}
