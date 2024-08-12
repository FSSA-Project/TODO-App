package com.fssa.todo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "title is mandatory")
    private String title;

    @NotBlank(message = "description is mandatory")
    private String description;

    // Define many to one and this is enum
    @NotNull(message = "StatusId is mandatory")
    @ManyToOne
    @JoinColumn(name = "task_status_id", referencedColumnName = "id")
    private TaskStatus taskStatusId;


    @Column(name = "created_at")
    private LocalDate createdAt;
    private LocalDate dueDate;

    @ManyToOne // A one User can create a multiple task so that Many to one
    @JsonManagedReference // This act as the parent
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    // it user_id refers the search the id by tasks table
    private User user;

}
