import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Tarefa = {
  id: number,
  title: string,
}

const toDoList = () => {
  const [tarefas, setTarefas] = useState<Array<Tarefa>>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa === "") return;

    const nova = {
      id: Date.now(),
      title: novaTarefa
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  const removerTarefa = (id: number) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id != id));
  };

  return (
    <FlatList
      data={tarefas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tarefaContainer}>
          <Text style={styles.tarefaTexto}>{item.title}</Text>
          <TouchableOpacity onPress={() => removerTarefa(item.id)}>
            <Text style={styles.removerIcone}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Insira a tarefa"
            value={novaTarefa}
            onChangeText={novaTarefa => setNovaTarefa(novaTarefa)}
          />
          <TouchableOpacity onPress={adicionarTarefa} style={styles.botao}>
            <Text style={styles.botaoTexto}>+</Text>
          </TouchableOpacity>
        </View>
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  botao: {
    backgroundColor: "#0a84ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
  },
  tarefaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  tarefaTexto: {
    fontSize: 16,
    color: "#000",
  },
  removerIcone: {
    fontSize: 20,
    color: "#ff0000",
  },
})

export default toDoList;
