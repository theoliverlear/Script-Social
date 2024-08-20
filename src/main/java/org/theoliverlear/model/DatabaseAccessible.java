package org.theoliverlear.model;

public interface DatabaseAccessible<T> {
    void save(T itemToSave);
    T update(T itemToUpdate);
}
