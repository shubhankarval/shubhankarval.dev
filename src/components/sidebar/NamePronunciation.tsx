'use client';

import { useState, useSyncExternalStore } from 'react';

// Capability probe, not a subscription - support never changes after load.
const neverChanges = () => () => {};
const supportsSpeech = () => 'speechSynthesis' in window;
const notOnServer = () => false;

interface NamePronunciationProps {
  name: string;
  ipa: string;
  respelling: string;
}

export default function NamePronunciation({
  name,
  ipa,
  respelling,
}: Readonly<NamePronunciationProps>) {
  const canSpeak = useSyncExternalStore(neverChanges, supportsSpeech, notOnServer);
  const [speaking, setSpeaking] = useState(false);

  const say = () => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  return (
    <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-text-faint">
      <span className="text-text-muted">{ipa}</span>
      <span>{respelling}</span>
      {canSpeak && (
        <button
          type="button"
          onClick={say}
          aria-label={`Hear ${name} pronounced`}
          className={`cursor-pointer rounded-[3px] border px-1 leading-normal transition-colors ${
            speaking
              ? 'border-accent text-accent'
              : 'border-line hover:border-accent hover:text-accent'
          }`}
        >
          say
        </button>
      )}
    </p>
  );
}
