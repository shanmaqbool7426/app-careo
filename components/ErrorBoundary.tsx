import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ErrorBoundaryState { hasError: boolean; error?: Error; }
interface ErrorBoundaryProps { children: ReactNode; }

function ErrorFallback({ error, onRetry }: { error?: Error; onRetry: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error?.message || 'An unexpected error occurred'}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#000' },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#000', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
