
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Mic, Pause, Play, Square, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from './ui/progress';

interface AudioRecorderProps {
    onRecordingComplete: (file: File) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<'inactive' | 'recording' | 'paused'>('inactive');
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState<string | null>(null);
    const [timer, setTimer] = useState(60);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        getMicrophonePermission();
        return () => {
             if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        }
    }, []);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err: any) {
                toast({ variant: "destructive", title: "Permission Denied", description: err.message });
            }
        } else {
            toast({ variant: "destructive", title: "Not Supported", description: "The MediaRecorder API is not supported in your browser." });
        }
    };

    const startRecording = () => {
        if (!stream) return;
        setRecordingStatus('recording');
        const media = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        setMediaRecorder(media);
        media.start();

        let localAudioChunks: Blob[] = [];
        media.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);

        // Start timer
        setTimer(60);
        timerIntervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    stopRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopRecording = () => {
        if (!mediaRecorder) return;
        setRecordingStatus('inactive');
        mediaRecorder.stop();
         if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            const audioFile = new File([audioBlob], "audio_note.webm", { type: 'audio/webm' });
            onRecordingComplete(audioFile);
            setAudioChunks([]);
        };
    };

    const deleteRecording = () => {
        setAudio(null);
        setTimer(60);
    }

    if (!permission) {
        return (
            <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg bg-muted/50">
                 <p className="text-sm text-center text-muted-foreground mb-2">मायक्रोफोनला परवानगी द्या</p>
                <Button onClick={getMicrophonePermission}>परवानगी मिळवा</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 border rounded-lg gap-4">
            {audio ? (
                <div className="w-full flex flex-col gap-2">
                    <audio src={audio} controls className="w-full"/>
                    <Button variant="destructive" onClick={deleteRecording} size="sm">
                        <Trash2 className="mr-2"/> हटवा
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center justify-center gap-4">
                        <Button 
                            onClick={recordingStatus === 'recording' ? stopRecording : startRecording} 
                            size="icon" 
                            className="h-14 w-14 rounded-full"
                            variant={recordingStatus === 'recording' ? "destructive" : "default"}
                        >
                            {recordingStatus === 'recording' ? <Square /> : <Mic />}
                        </Button>
                    </div>
                    {recordingStatus === 'recording' && (
                        <div className="w-full flex flex-col items-center gap-2">
                             <Progress value={(60 - timer) / 60 * 100} className="w-full h-2"/>
                            <p className="text-sm text-muted-foreground font-mono">{`00:${timer.toString().padStart(2, '0')}`}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
